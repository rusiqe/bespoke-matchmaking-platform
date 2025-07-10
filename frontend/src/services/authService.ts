import axios from 'axios';
import { LoginCredentials, RegisterData, User, AuthResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth service functions
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterData): Promise<{ message: string; userId: string }> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/profile');
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Continue with logout even if server request fails
    console.error('Logout request failed:', error);
  }
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put('/auth/profile', userData);
  return response.data.user;
};

export const verifyEmail = async (token: string): Promise<User> => {
  const response = await api.post('/auth/verify-email', { token });
  return response.data.user;
};

export const sendEmailVerification = async (): Promise<void> => {
  await api.post('/auth/send-verification');
};

export const resetPassword = async (email: string): Promise<void> => {
  await api.post('/auth/reset-password', { email });
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  await api.post('/auth/change-password', { currentPassword, newPassword });
};

export const deleteAccount = async (password: string): Promise<void> => {
  await api.delete('/auth/account', { data: { password } });
};

// OAuth login functions
export const googleLogin = async (token: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

export const facebookLogin = async (token: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/facebook', { token });
  return response.data;
};

// Two-factor authentication
export const enable2FA = async (): Promise<{ qrCode: string; secret: string }> => {
  const response = await api.post('/auth/enable-2fa');
  return response.data;
};

export const verify2FA = async (token: string): Promise<void> => {
  await api.post('/auth/verify-2fa', { token });
};

export const disable2FA = async (token: string): Promise<void> => {
  await api.post('/auth/disable-2fa', { token });
};

export const login2FA = async (email: string, password: string, token: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login-2fa', { email, password, token });
  return response.data;
};

// Session management
export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

export const getActiveSessions = async (): Promise<any[]> => {
  const response = await api.get('/auth/sessions');
  return response.data.sessions;
};

export const terminateSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/auth/sessions/${sessionId}`);
};

export const terminateAllSessions = async (): Promise<void> => {
  await api.delete('/auth/sessions');
};

export default api;
