// lib/logger.js
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, json, printf } = format;

// Import the Datadog transport for Winston
const { DatadogWinston } = require('datadog-winston');

// Define log format
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  return JSON.stringify({
    level,
    message,
    timestamp,
    ...metadata
  });
});

// Create the logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json(),
    logFormat
  ),
  defaultMeta: { 
    service: 'micro-link',
    env: process.env.NODE_ENV
  },
  transports: [
    // Console transport for local development
    new transports.Console(),
    
    // Datadog transport for production
    new DatadogWinston({
      apiKey: process.env.DATADOG_API_KEY,
      hostname: process.env.HOSTNAME,
      service: 'micro-link',
      ddsource: 'nodejs',
      ddtags: `env:${process.env.NODE_ENV}`,
    })
  ]
});

// Add request context middleware for Express
logger.expressMiddleware = (req, res, next) => {
  req.logger = logger.child({
    requestId: req.headers['x-request-id'] || req.id,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
};

module.exports = logger;