import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { config } from '../config/config';

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error class
export class ValidationError extends AppError {
  public fields: { [key: string]: string };

  constructor(message: string, fields: { [key: string]: string }) {
    super(message, 400);
    this.fields = fields;
    this.name = 'ValidationError';
  }
}

// Authentication error class
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

// Authorization error class
export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

// Not found error class
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

// Rate limit error class
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

// Database error handler
const handleDatabaseError = (error: any): AppError => {
  if (error.code === '23505') {
    // Unique constraint violation
    return new ValidationError('Duplicate entry detected', {
      field: error.detail || 'Unknown field',
    });
  }
  
  if (error.code === '23503') {
    // Foreign key constraint violation
    return new ValidationError('Referenced record does not exist', {
      field: error.detail || 'Unknown field',
    });
  }
  
  if (error.code === '23502') {
    // Not null constraint violation
    return new ValidationError('Required field is missing', {
      field: error.column || 'Unknown field',
    });
  }
  
  return new AppError('Database operation failed', 500, false);
};

// JWT error handler
const handleJWTError = (error: any): AppError => {
  if (error.name === 'JsonWebTokenError') {
    return new AuthenticationError('Invalid token');
  }
  
  if (error.name === 'TokenExpiredError') {
    return new AuthenticationError('Token expired');
  }
  
  return new AuthenticationError('Token verification failed');
};

// Mongoose error handler
const handleMongooseError = (error: any): AppError => {
  if (error.name === 'CastError') {
    return new ValidationError('Invalid ID format', { id: error.value });
  }
  
  if (error.name === 'ValidationError') {
    const errors: { [key: string]: string } = {};
    Object.keys(error.errors).forEach(key => {
      errors[key] = error.errors[key].message;
    });
    return new ValidationError('Validation failed', errors);
  }
  
  if (error.code === 11000) {
    // Duplicate key error
    const field = Object.keys(error.keyValue)[0];
    return new ValidationError('Duplicate entry', { [field]: 'Already exists' });
  }
  
  return new AppError('Database operation failed', 500, false);
};

// Multer error handler
const handleMulterError = (error: any): AppError => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return new ValidationError('File too large', { file: 'Maximum file size exceeded' });
  }
  
  if (error.code === 'LIMIT_FILE_COUNT') {
    return new ValidationError('Too many files', { files: 'Maximum file count exceeded' });
  }
  
  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return new ValidationError('Unexpected file field', { file: 'Invalid file field' });
  }
  
  return new ValidationError('File upload failed', { file: error.message });
};

// Send error response
const sendErrorResponse = (error: AppError, res: Response) => {
  const errorResponse: any = {
    error: {
      message: error.message,
      status: error.statusCode,
      timestamp: new Date().toISOString(),
    },
  };

  // Add additional fields for validation errors
  if (error instanceof ValidationError) {
    errorResponse.error.fields = error.fields;
  }

  // Add stack trace in development
  if (config.nodeEnv === 'development') {
    errorResponse.error.stack = error.stack;
  }

  res.status(error.statusCode).json(errorResponse);
};

// Main error handler middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let appError: AppError;

  // Handle different types of errors
  if (error instanceof AppError) {
    appError = error;
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    appError = handleJWTError(error);
  } else if (error.name === 'ValidationError' || error.name === 'CastError') {
    appError = handleMongooseError(error);
  } else if ((error as any).code && typeof (error as any).code === 'string') {
    // Database errors
    appError = handleDatabaseError(error);
  } else if ((error as any).code && (error as any).code.startsWith('LIMIT_')) {
    // Multer errors
    appError = handleMulterError(error);
  } else {
    // Generic error
    appError = new AppError(
      config.nodeEnv === 'development' ? error.message : 'Internal server error',
      500,
      false
    );
  }

  // Log error
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
    timestamp: new Date().toISOString(),
  });

  // Send error response
  sendErrorResponse(appError, res);
};

// Async error handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

export default errorHandler;
