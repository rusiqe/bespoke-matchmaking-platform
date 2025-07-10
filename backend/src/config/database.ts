import { Pool } from 'pg';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import knex from 'knex';
import { config } from './config';
import { logger } from '../utils/logger';

// PostgreSQL connection (for relational data)
export const pgPool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Knex instance for query building
export const db = knex({
  client: 'postgresql',
  connection: config.databaseUrl,
  pool: {
    min: 2,
    max: 10,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
});

// MongoDB connection (for flexible data storage)
export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });
    
    logger.info('✅ MongoDB connected successfully');
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

// Redis connection (for caching and sessions)
export const redisClient = createClient({
  url: config.redisUrl,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redisClient.on('reconnecting', () => {
  logger.info('🔄 Redis reconnecting...');
});

redisClient.on('ready', () => {
  logger.info('✅ Redis ready for operations');
});

// Initialize Redis connection
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

// Test PostgreSQL connection
export const testPostgreSQLConnection = async (): Promise<void> => {
  try {
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('✅ PostgreSQL connected successfully');
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

// Connect to all databases
export const connectDatabases = async (): Promise<void> => {
  const connections = [
    testPostgreSQLConnection(),
    connectMongoDB(),
    connectRedis(),
  ];

  try {
    await Promise.all(connections);
    logger.info('🎯 All databases connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Graceful shutdown for database connections
export const closeDatabaseConnections = async (): Promise<void> => {
  try {
    await pgPool.end();
    await mongoose.disconnect();
    await redisClient.quit();
    logger.info('🔌 All database connections closed');
  } catch (error) {
    logger.error('❌ Error closing database connections:', error);
    throw error;
  }
};

// Health check function
export const checkDatabaseHealth = async (): Promise<{
  postgresql: boolean;
  mongodb: boolean;
  redis: boolean;
}> => {
  const health = {
    postgresql: false,
    mongodb: false,
    redis: false,
  };

  try {
    // Check PostgreSQL
    const client = await pgPool.connect();
    await client.query('SELECT 1');
    client.release();
    health.postgresql = true;
  } catch (error) {
    logger.error('PostgreSQL health check failed:', error);
  }

  try {
    // Check MongoDB
    if (mongoose.connection.readyState === 1) {
      health.mongodb = true;
    }
  } catch (error) {
    logger.error('MongoDB health check failed:', error);
  }

  try {
    // Check Redis
    await redisClient.ping();
    health.redis = true;
  } catch (error) {
    logger.error('Redis health check failed:', error);
  }

  return health;
};

// Export individual database instances for use in other modules
export { mongoose, pgPool as postgres, redisClient as redis };

// MongoDB schemas will be defined in separate model files
// PostgreSQL tables will be defined in migration files
// Redis will be used for caching and session storage
