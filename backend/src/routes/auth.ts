import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import { config } from '../config/config';
import { authenticateUser, requireAuth } from '../middleware/auth';
import { User } from '../types';
import { logger } from '../utils/logger';

const router = express.Router();

// Mock user storage for demonstration
const mockUsers: User[] = [];

// Register a new user
router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('dateOfBirth').isDate()
  ],
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    // Check if the user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

    // Create a new user
    const newUser: User = {
      id: mockUsers.length.toString(),
      email,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      gender: 'female',
      isEmailVerified: false,
      isPhoneVerified: false,
      isIdentityVerified: false,
      isBackgroundCheckComplete: false,
      isActive: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActiveAt: new Date(),
      preferences: {},
      privacy: {
        profileVisibility: 'private',
        showAge: false,
        showLocation: false,
        showEducation: false,
        showOccupation: false,
        allowMessages: false,
        allowVideoCall: false,
        dataRetention: 365
      }
    };

    // Add user to mock storage
    mockUsers.push(newUser);

    logger.info(`User registered: ${newUser.email}`);

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.id
    });
  })
);

// Login a user
router.post(
  '/login',
  [
    check('email').isEmail(),
    check('password').notEmpty()
  ],
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the user
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, email); // Assuming password is same as email for mock
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    logger.info(`User login successful: ${user.email}`);

    res.json({
      message: 'Login successful',
      token
    });
  })
);

// Protected route
router.get(
  '/profile',
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({
      message: 'User profile retrieved successfully',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  })
);

export default router;
