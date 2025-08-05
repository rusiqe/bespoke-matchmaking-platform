import dotenv from 'dotenv';

dotenv.config();

interface Config {
  // Server Configuration
  nodeEnv: string;
  port: number;
  apiVersion: string;
  corsOrigin: string;




}

const requiredEnvVars: string[] = [
  // No required env vars for MVP
];

// Validate required environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config: Config = {
  // Server Configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',




};


export default config;
