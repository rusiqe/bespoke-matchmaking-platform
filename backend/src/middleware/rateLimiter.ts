import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { redisClient } from '../config/database';

// Custom rate limit store using Redis
class RedisStore {
  private client: typeof redisClient;
  private prefix: string;

  constructor(client: typeof redisClient, prefix = 'rate-limit:') {
    this.client = client;
    this.prefix = prefix;
  }

  async increment(key: string, windowMs: number): Promise<{ totalHits: number; timeToExpire: number }> {
    const redisKey = `${this.prefix}${key}`;
    
    try {
      const multi = this.client.multi();
      multi.incr(redisKey);
      multi.expire(redisKey, Math.ceil(windowMs / 1000));
      multi.ttl(redisKey);
      
      const results = await multi.exec();
      
      if (!results) {
        throw new Error('Redis multi command failed');
      }
      
      const totalHits = results[0] as number;
      const timeToExpire = (results[2] as number) * 1000; // Convert to milliseconds
      
      return { totalHits, timeToExpire };
    } catch (error) {
      logger.error('Redis rate limit store error:', error);
      // Fallback to allow request if Redis fails
      return { totalHits: 1, timeToExpire: windowMs };
    }
  }

  async decrement(key: string): Promise<void> {
    const redisKey = `${this.prefix}${key}`;
    
    try {
      const current = await this.client.get(redisKey);
      if (current && parseInt(current) > 0) {
        await this.client.decr(redisKey);
      }
    } catch (error) {
      logger.error('Redis rate limit decrement error:', error);
    }
  }

  async resetKey(key: string): Promise<void> {
    const redisKey = `${this.prefix}${key}`;
    
    try {
      await this.client.del(redisKey);
    } catch (error) {
      logger.error('Redis rate limit reset error:', error);
    }
  }
}

// Rate limiter configuration
const createRateLimiter = (options: {
  windowMs: number;
  max: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}) => {
  const store = new RedisStore(redisClient);
  
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: {
      error: options.message || 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(options.windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    skipFailedRequests: options.skipFailedRequests || false,
    keyGenerator: options.keyGenerator || ((req: Request) => req.ip),
    store: {
      incr: (key: string, cb: (err: Error | null, result?: { totalHits: number; timeToExpire: number }) => void) => {
        store.increment(key, options.windowMs)
          .then(result => cb(null, result))
          .catch(err => cb(err));
      },
      decrement: (key: string, cb?: (err: Error | null) => void) => {
        store.decrement(key)
          .then(() => cb?.(null))
          .catch(err => cb?.(err));
      },
      resetKey: (key: string, cb?: (err: Error | null) => void) => {
        store.resetKey(key)
          .then(() => cb?.(null))
          .catch(err => cb?.(err));
      },
    },
    handler: (req: Request, res: Response) => {
      logger.warn('Rate limit exceeded:', {
        ip: req.ip,
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent'),
        userId: (req as any).user?.id,
      });
      
      res.status(429).json({
        error: {
          message: options.message || 'Too many requests, please try again later.',
          status: 429,
          retryAfter: Math.ceil(options.windowMs / 1000),
          timestamp: new Date().toISOString(),
        },
      });
    },
  });
};

// General rate limiter (applies to all routes)
export const rateLimiter = createRateLimiter({
  windowMs: config.security.rateLimitWindowMs,
  max: config.security.rateLimitMaxRequests,
  message: 'Too many requests from this IP, please try again later.',
});

// Strict rate limiter for sensitive endpoints
export const strictRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many attempts for this sensitive action, please try again later.',
});

// Authentication rate limiter
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Password reset rate limiter
export const passwordResetRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 password reset requests per hour
  message: 'Too many password reset attempts, please try again later.',
  keyGenerator: (req: Request) => req.body.email || req.ip,
});

// Email verification rate limiter
export const emailVerificationRateLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 verification emails per 5 minutes
  message: 'Too many verification emails sent, please try again later.',
  keyGenerator: (req: Request) => req.body.email || req.ip,
});

// File upload rate limiter
export const uploadRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // 20 uploads per 10 minutes
  message: 'Too many file uploads, please try again later.',
});

// Admin action rate limiter
export const adminRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 admin actions per minute
  message: 'Too many admin actions, please slow down.',
  keyGenerator: (req: Request) => (req as any).user?.id || req.ip,
});

// Screening action rate limiter
export const screeningRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 screening actions per hour
  message: 'Too many screening actions, please try again later.',
  keyGenerator: (req: Request) => (req as any).user?.id || req.ip,
});

// Messaging rate limiter
export const messagingRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 messages per minute
  message: 'Too many messages sent, please slow down.',
  keyGenerator: (req: Request) => (req as any).user?.id || req.ip,
});

// Search rate limiter
export const searchRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 searches per minute
  message: 'Too many search requests, please try again later.',
  keyGenerator: (req: Request) => (req as any).user?.id || req.ip,
});

// API key rate limiter (for external services)
export const apiKeyRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // 1000 requests per hour per API key
  message: 'API rate limit exceeded, please try again later.',
  keyGenerator: (req: Request) => req.headers['x-api-key'] as string || req.ip,
});

export default rateLimiter;
