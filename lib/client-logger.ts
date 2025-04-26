// lib/client-logger.ts
'use client'

import { logEvent } from '@/app/actions/logging';

export const clientLogger = {
  info: async (message: string, data: Record<string, any> = {}) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, data);
    }
    
    // Send to server for proper logging
    try {
      await logEvent(message, {
        ...data,
        level: 'info',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to send log to server', error);
    }
    
    // If Datadog RUM is available, log there too
    if (typeof window !== 'undefined' && window.DD_RUM) {
      window.DD_RUM.addAction('log', {
        message,
        ...data,
        level: 'info',
      });
    }
  },
  
  error: async (message: string, data: Record<string, any> = {}) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, data);
    }
    
    // Send to server for proper logging
    try {
      await logEvent(message, {
        ...data,
        level: 'error',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to send log to server', error);
    }
    
    // If Datadog RUM is available, log there too
    if (typeof window !== 'undefined' && window.DD_RUM) {
      window.DD_RUM.addError(new Error(message), {
        ...data,
      });
    }
  }
};