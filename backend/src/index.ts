import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import configurations and utilities
import { config } from './config/config';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const app = express();

// Basic CORS for frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Matchmaking platform server is running'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'This is a minimal server for the matchmaking platform.',
    path: req.originalUrl
  });
});


// Start server
const PORT = config.port || 3001;

app.listen(PORT, () => {
  logger.info(`
    🚀 Matchmaking Platform Server (MVP)
    📡 Port: ${PORT}
    🔗 Health Check: http://localhost:${PORT}/health
    💬 WhatsApp-based contact system ready
  `);
});

export { app };
