import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import configurations and utilities
import { config } from './config/config';
import { logger } from './utils/logger';
import { connectDatabases } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { setupPassport } from './config/passport';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import profileRoutes from './routes/profile';
import matchRoutes from './routes/match';
import adminRoutes from './routes/admin';
import uploadRoutes from './routes/upload';
import screeningRoutes from './routes/screening';
import communicationRoutes from './routes/communication';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimiter);

// Initialize Passport
setupPassport(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: config.apiVersion
  });
});

// API Routes
app.use(`/api/${config.apiVersion}/auth`, authRoutes);
app.use(`/api/${config.apiVersion}/users`, userRoutes);
app.use(`/api/${config.apiVersion}/profiles`, profileRoutes);
app.use(`/api/${config.apiVersion}/matches`, matchRoutes);
app.use(`/api/${config.apiVersion}/admin`, adminRoutes);
app.use(`/api/${config.apiVersion}/upload`, uploadRoutes);
app.use(`/api/${config.apiVersion}/screening`, screeningRoutes);
app.use(`/api/${config.apiVersion}/communication`, communicationRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found on this server.',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Handle user authentication for real-time features
  socket.on('authenticate', (token) => {
    // TODO: Implement JWT verification for socket connections
    logger.info(`User authenticated: ${socket.id}`);
  });

  // Handle private messaging
  socket.on('join-conversation', (conversationId) => {
    socket.join(conversationId);
    logger.info(`User ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on('send-message', (data) => {
    // TODO: Implement message validation and storage
    io.to(data.conversationId).emit('new-message', data);
    logger.info(`Message sent in conversation ${data.conversationId}`);
  });

  // Handle video call signaling
  socket.on('call-offer', (data) => {
    socket.to(data.targetUserId).emit('call-offer', data);
  });

  socket.on('call-answer', (data) => {
    socket.to(data.targetUserId).emit('call-answer', data);
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.targetUserId).emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    logger.info('HTTP server closed');
    
    // Close database connections
    // TODO: Implement database connection cleanup
    
    logger.info('Graceful shutdown completed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const startServer = async () => {
  try {
    // Connect to databases
    await connectDatabases();
    
    server.listen(config.port, () => {
      logger.info(`
        🚀 Bespoke Matchmaking Platform API Server
        📡 Port: ${config.port}
        🌍 Environment: ${config.nodeEnv}
        📋 API Version: ${config.apiVersion}
        🔗 Health Check: http://localhost:${config.port}/health
      `);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

export { app, io };
