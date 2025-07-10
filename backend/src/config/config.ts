import dotenv from 'dotenv';

dotenv.config();

interface Config {
  // Server Configuration
  nodeEnv: string;
  port: number;
  apiVersion: string;
  corsOrigin: string;

  // Database Configuration
  databaseUrl: string;
  mongodbUri: string;
  redisUrl: string;

  // JWT Configuration
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;

  // OAuth Configuration
  google: {
    clientId: string;
    clientSecret: string;
  };
  facebook: {
    appId: string;
    appSecret: string;
  };

  // Email Configuration
  email: {
    smtp: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };
    from: string;
    sendgridApiKey?: string;
  };

  // Twilio Configuration
  twilio: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };

  // File Upload Configuration
  upload: {
    path: string;
    maxFileSize: number;
    allowedFileTypes: string[];
  };

  // AWS Configuration
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    s3Bucket: string;
  };

  // Security Configuration
  security: {
    bcryptRounds: number;
    sessionSecret: string;
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
  };

  // External Services
  externalServices: {
    backgroundCheckApiKey: string;
    locationApiKey: string;
    aiServiceUrl: string;
    aiServiceApiKey: string;
  };

  // Monitoring Configuration
  monitoring: {
    sentryDsn: string;
    logLevel: string;
  };

  // Webhooks
  webhookSecret: string;
}

const requiredEnvVars = [
  'JWT_SECRET',
  'DATABASE_URL',
  'MONGODB_URI',
  'REDIS_URL'
];

// Validate required environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config: Config = {
  // Server Configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',

  // Database Configuration
  databaseUrl: process.env.DATABASE_URL!,
  mongodbUri: process.env.MONGODB_URI!,
  redisUrl: process.env.REDIS_URL!,

  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

  // OAuth Configuration
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
  },

  // Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
    from: process.env.FROM_EMAIL || 'noreply@bespokematchmaking.com',
    sendgridApiKey: process.env.SENDGRID_API_KEY,
  },

  // Twilio Configuration
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },

  // File Upload Configuration
  upload: {
    path: process.env.UPLOAD_PATH || 'uploads/',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,gif,pdf,doc,docx').split(','),
  },

  // AWS Configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
  },

  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // External Services
  externalServices: {
    backgroundCheckApiKey: process.env.BACKGROUND_CHECK_API_KEY || '',
    locationApiKey: process.env.LOCATION_API_KEY || '',
    aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:5000',
    aiServiceApiKey: process.env.AI_SERVICE_API_KEY || '',
  },

  // Monitoring Configuration
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN || '',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  // Webhooks
  webhookSecret: process.env.WEBHOOK_SECRET || '',
};

// Validate configuration for production
if (config.nodeEnv === 'production') {
  const productionRequiredVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'SENTRY_DSN'
  ];

  const missingProdVars = productionRequiredVars.filter(envVar => !process.env[envVar]);
  if (missingProdVars.length > 0) {
    console.warn(`Warning: Missing production environment variables: ${missingProdVars.join(', ')}`);
  }
}

export default config;
