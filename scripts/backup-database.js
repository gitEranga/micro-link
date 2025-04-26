#!/usr/bin/env node
// scripts/backup-database.js

const { exec } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const logger = require('../lib/logger');

// Configure AWS
const s3 = new AWS.S3({
  region: process.env.AWS_REGION
});

// Backup configuration
const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  backupBucket: process.env.BACKUP_BUCKET,
  backupPrefix: process.env.BACKUP_PREFIX || 'database-backups',
  retentionDays: parseInt(process.env.BACKUP_RETENTION_DAYS || '30', 10)
};

// Create backup filename with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFilename = `${config.dbName}-${timestamp}.sql.gz`;
const localBackupPath = path.join('/tmp', backupFilename);

// Execute database dump
const performBackup = () => {
  return new Promise((resolve, reject) => {
    const command = `PGPASSWORD="${config.dbPassword}" pg_dump -h ${config.dbHost} -U ${config.dbUser} ${config.dbName} | gzip > ${localBackupPath}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error('Database backup failed', { error: error.message });
        return reject(error);
      }
      
      logger.info('Database backup created successfully', { path: localBackupPath });
      resolve(localBackupPath);
    });
  });
};

// Upload backup to S3
const uploadToS3 = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const s3Key = `${config.backupPrefix}/${backupFilename}`;
    
    const params = {
      Bucket: config.backupBucket,
      Key: s3Key,
      Body: fileStream,
      ContentType: 'application/gzip',
      ServerSideEncryption: 'AES256'
    };
    
    s3.upload(params, (err, data) => {
      if (err) {
        logger.error('S3 upload failed', { error: err.message });
        return reject(err);
      }
      
      logger.info('Backup uploaded to S3 successfully', { 
        bucket: config.backupBucket,
        key: s3Key,
        location: data.Location
      });
      
      // Clean up local file
      fs.unlinkSync(filePath);
      resolve(data.Location);
    });
  });
};

// Delete old backups beyond retention period
const cleanupOldBackups = async () => {
  const retentionDate = new Date();
  retentionDate.setDate(retentionDate.getDate() - config.retentionDays);
  
  const params = {
    Bucket: config.backupBucket,
    Prefix: config.backupPrefix
  };
  
  try {
    const listedObjects = await s3.listObjectsV2(params).promise();
    
    if (listedObjects.Contents.length === 0) return;
    
    const deleteParams = {
      Bucket: config.backupBucket,
      Delete: { Objects: [] }
    };
    
    listedObjects.Contents.forEach(({ Key, LastModified }) => {
      if (LastModified < retentionDate) {
        deleteParams.Delete.Objects.push({ Key });
      }
    });
    
    if (deleteParams.Delete.Objects.length > 0) {
      await s3.deleteObjects(deleteParams).promise();
      logger.info('Cleaned up old backups', { 
        count: deleteParams.Delete.Objects.length,
        retentionDays: config.retentionDays
      });
    }
  } catch (err) {
    logger.error('Error cleaning up old backups', { error: err.message });
  }
};

// Main backup process
const runBackup = async () => {
  try {
    logger.info('Starting database backup process');
    const backupPath = await performBackup();
    const uploadLocation = await uploadToS3(backupPath);
    await cleanupOldBackups();
    logger.info('Backup process completed successfully');
    
    // Notify Datadog
    const metrics = require('../lib/metrics');
    metrics.track('database.backup.success', 1, [
      `backup_file:${backupFilename}`,
      `bucket:${config.backupBucket}`
    ]);
    
    return { success: true, location: uploadLocation };
  } catch (error) {
    logger.error('Backup process failed', { error: error.message });
    
    // Notify Datadog
    const metrics = require('../lib/metrics');
    metrics.track('database.backup.failure', 1, [
      `error:${error.message}`
    ]);
    
    return { success: false, error: error.message };
  }
};

// Run backup if executed directly
if (require.main === module) {
  runBackup()
    .then(result => {
      if (result.success) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(err => {
      logger.error('Unhandled error in backup script', { error: err.message });
      process.exit(1);
    });
} else {
  // Export for use as a module
  module.exports = runBackup;
}