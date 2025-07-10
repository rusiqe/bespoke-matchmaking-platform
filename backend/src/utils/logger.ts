import winston from 'winston';
import { config } from '../config/config';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Add colors to winston
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  
  // File transport for error logs
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
  
  // File transport for all logs
  new winston.transports.File({
    filename: 'logs/combined.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

// Create logger instance
export const logger = winston.createLogger({
  level: config.monitoring.logLevel,
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create stream for Morgan HTTP logging
export const logStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Add production-specific transports
if (config.nodeEnv === 'production') {
  // Remove colorize for production
  logger.configure({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
      }),
    ],
  });
}

// Error logging utility
export const logError = (error: Error, context?: string) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  };
  
  logger.error('Application Error:', errorInfo);
};

// HTTP request logging utility
export const logRequest = (req: any, res: any, next: any) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id,
    };
    
    logger.http('HTTP Request:', logData);
  });
  
  next();
};

// Security event logging
export const logSecurityEvent = (event: string, details: any, userId?: string) => {
  const securityLog = {
    event,
    details,
    userId,
    timestamp: new Date().toISOString(),
    severity: 'WARNING',
  };
  
  logger.warn('Security Event:', securityLog);
};

// Database operation logging
export const logDatabaseOperation = (operation: string, table: string, duration: number, success: boolean) => {
  const dbLog = {
    operation,
    table,
    duration: `${duration}ms`,
    success,
    timestamp: new Date().toISOString(),
  };
  
  if (success) {
    logger.debug('Database Operation:', dbLog);
  } else {
    logger.error('Database Operation Failed:', dbLog);
  }
};

// AI/ML operation logging
export const logAIOperation = (operation: string, data: any, result: any) => {
  const aiLog = {
    operation,
    inputData: data,
    result,
    timestamp: new Date().toISOString(),
  };
  
  logger.info('AI Operation:', aiLog);
};

export default logger;
