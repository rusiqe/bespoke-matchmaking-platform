// User-related types
export interface User {
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'female' | 'male' | 'non-binary' | 'prefer-not-to-say';
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdentityVerified: boolean;
  isBackgroundCheckComplete: boolean;
  isActive: boolean;
  role: 'user' | 'admin' | 'matchmaker';
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
  preferences?: UserPreferences;
  privacy?: PrivacySettings;
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
  startDate: string;
  endDate: string;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  duration: number;
  isVerified: boolean;
  createdAt: string;
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
  introductionDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Introduction {
  id: string;
  matchId: string;
  message: string;
  scheduledDate?: string;
  venue?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: IntroductionFeedback[];
  createdAt: string;
  updatedAt: string;
}

export interface IntroductionFeedback {
  userId: string;
  rating: number; // 1-5 scale
  feedback: string;
  wouldMeetAgain: boolean;
  submittedAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'female' | 'male' | 'non-binary' | 'prefer-not-to-say';
}

export interface AuthResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

// API Response types
export interface ApiResponse<T = any> {
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

// Form types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

// UI Component types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  active?: boolean;
  badge?: string | number;
}

// Onboarding types
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
  isRequired: boolean;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary';
}

// Upload types
export interface FileUploadConfig {
  maxSize: number;
  allowedTypes: string[];
  multiple?: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Search and filter types
export interface SearchFilters {
  ageRange?: [number, number];
  location?: string;
  education?: string[];
  interests?: string[];
  relationshipGoals?: string[];
}

export interface SortOption {
  field: string;
  order: 'asc' | 'desc';
  label: string;
}

// Theme types
export interface ThemeConfig {
  colorMode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  reducedMotion: boolean;
}

// Application state types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  profile: Profile | null;
  theme: ThemeConfig;
  notifications: Notification[];
}

// WebRTC types
export interface VideoCallConfig {
  video: boolean;
  audio: boolean;
  screen?: boolean;
}

export interface WebRTCConnection {
  id: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  connection?: RTCPeerConnection;
  status: 'connecting' | 'connected' | 'disconnected' | 'failed';
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp: string;
}

export interface PageView {
  page: string;
  title?: string;
  userId?: string;
  timestamp: string;
}

// Accessibility types
export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
}
