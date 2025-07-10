import { Request } from 'express';

// User-related types
export interface User {
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'female' | 'male' | 'non-binary' | 'prefer-not-to-say';
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdentityVerified: boolean;
  isBackgroundCheckComplete: boolean;
  isActive: boolean;
  role: 'user' | 'admin' | 'matchmaker';
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  preferences: UserPreferences;
  privacy: PrivacySettings;
  subscription?: Subscription;
}

export interface UserPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  locationRange: number; // in miles
  education: string[];
  occupation: string[];
  interests: string[];
  dealBreakers: string[];
  relationshipGoals: string[];
  children: {
    has: boolean;
    wants: boolean;
  };
  smoking: 'never' | 'occasionally' | 'regularly' | 'prefer-not-to-say';
  drinking: 'never' | 'occasionally' | 'socially' | 'regularly' | 'prefer-not-to-say';
  religion: string;
  religiousImportance: 'not-important' | 'somewhat-important' | 'very-important';
  ethnicity: string[];
  height: {
    min: number;
    max: number;
  };
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'matchmaker-only' | 'private';
  showAge: boolean;
  showLocation: boolean;
  showEducation: boolean;
  showOccupation: boolean;
  allowMessages: boolean;
  allowVideoCall: boolean;
  dataRetention: number; // in days
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'premium' | 'vip';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
}

// Profile-related types
export interface Profile {
  id: string;
  userId: string;
  bio: string;
  education: Education[];
  occupation: Occupation[];
  interests: Interest[];
  photos: Photo[];
  videos: Video[];
  location: Location;
  lifestyle: Lifestyle;
  values: Values;
  prompts: ProfilePrompt[];
  compatibility: CompatibilityProfile;
  isComplete: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
  isVerified: boolean;
}

export interface Occupation {
  company: string;
  position: string;
  industry: string;
  startYear: number;
  endYear?: number;
  isVerified: boolean;
}

export interface Interest {
  category: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  order: number;
  isMain: boolean;
  isVerified: boolean;
  createdAt: Date;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  duration: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isVerified: boolean;
}

export interface Lifestyle {
  fitnessLevel: 'low' | 'moderate' | 'high' | 'very-high';
  dietaryPreferences: string[];
  petPreferences: string[];
  livingArrangement: 'alone' | 'with-roommates' | 'with-family' | 'with-partner';
  travelFrequency: 'never' | 'rarely' | 'occasionally' | 'frequently';
}

export interface Values {
  familyImportance: number; // 1-10 scale
  careerImportance: number; // 1-10 scale
  spiritualityImportance: number; // 1-10 scale
  adventureImportance: number; // 1-10 scale
  stabilityImportance: number; // 1-10 scale
  socialImportance: number; // 1-10 scale
  personalGrowthImportance: number; // 1-10 scale
}

export interface ProfilePrompt {
  question: string;
  answer: string;
  isPublic: boolean;
}

export interface CompatibilityProfile {
  personalityType: string;
  loveLanguage: string[];
  communicationStyle: string;
  conflictResolution: string;
  socialEnergy: number; // 1-10 scale (introvert to extrovert)
  emotionalIntelligence: number; // 1-10 scale
}

// Matching-related types
export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  compatibilityScore: number;
  matchmakerApproved: boolean;
  matchmakerId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'introduced' | 'completed';
  introductionDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Introduction {
  id: string;
  matchId: string;
  message: string;
  scheduledDate?: Date;
  venue?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: IntroductionFeedback[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IntroductionFeedback {
  userId: string;
  rating: number; // 1-5 scale
  feedback: string;
  wouldMeetAgain: boolean;
  submittedAt: Date;
}

// Screening-related types
export interface Screening {
  id: string;
  userId: string;
  screenerId: string;
  type: 'phone' | 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  scheduledDate: Date;
  completedDate?: Date;
  notes?: string;
  outcome: 'approved' | 'rejected' | 'pending' | 'requires-follow-up';
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BackgroundCheck {
  id: string;
  userId: string;
  provider: string;
  status: 'pending' | 'completed' | 'failed';
  results?: any;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Communication-related types
export interface Conversation {
  id: string;
  participants: string[];
  matchId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoCall {
  id: string;
  conversationId: string;
  initiatorId: string;
  participantIds: string[];
  status: 'scheduled' | 'active' | 'ended' | 'cancelled';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  recordingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Admin-related types
export interface AdminUser {
  id: string;
  userId: string;
  role: 'admin' | 'super-admin' | 'matchmaker' | 'screener';
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

// API Request types
export interface AuthenticatedRequest extends Request {
  user?: User;
  token?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  q?: string;
  filters?: Record<string, any>;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  timestamp: string;
}

// JWT Payload type
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// File upload types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

// External service types
export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export interface AIMatchingRequest {
  userId: string;
  preferences: UserPreferences;
  profile: Profile;
  excludeUserIds?: string[];
  limit?: number;
}

export interface AIMatchingResponse {
  matches: Array<{
    userId: string;
    compatibilityScore: number;
    reasoning: string;
    matchFactors: string[];
  }>;
  confidence: number;
  processingTime: number;
}
