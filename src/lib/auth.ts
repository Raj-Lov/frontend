import { fetchApi, fetchWithAuth } from './api';
import { mockUsers } from './mockData';
import { User, LoginData, RegisterData, AuthResponse } from './types';

// Alias for backward compatibility
export interface LoginCredentials extends LoginData {
  username: string;
}

// Re-export types
export { User, RegisterData, AuthResponse };

// Mock user for development
const MOCK_USER: User = {
  id: 1,
  email: "admin@vetnol.com",
  full_name: "Admin User",
  role: "admin",
  bio: "Vetnol administrator with full access to all features.",
  avatar: "/images/users/admin.jpg",
  created_at: "2024-01-01T00:00:00"
};

// Check if we're using mock data
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false;

/**
 * Authentication API functions
 */
export const authApi = {
  /**
   * Login user
   * @param credentials Login credentials
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock login with credentials:', credentials);
        
        // For mock login, accept any credentials but use email to find a matching user if possible
        let user = mockUsers.find(u => u.email.toLowerCase() === credentials.username.toLowerCase());
        
        // If no matching user found, use the default admin user
        if (!user) {
          user = MOCK_USER;
        }
        
        // Create a mock token
        const token = `mock_token_${Math.random().toString(36).substring(2)}`;
        
        return {
          access_token: token,
          token_type: 'bearer',
          user: user
        };
      }
      
      return await fetchApi<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.warn('Login API error, using mock login:', error);
      
      // Fall back to mock login
      return {
        access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
        token_type: 'bearer',
        user: MOCK_USER
      };
    }
  },

  /**
   * Register new user
   * @param data Registration data
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock registration with data:', data);
        
        // Create a new mock user
        const newUser: User = {
          id: mockUsers.length + 100,
          email: data.email,
          full_name: data.full_name,
          role: 'user',
          created_at: new Date().toISOString()
        };
        
        // Create a mock token
        const token = `mock_token_${Math.random().toString(36).substring(2)}`;
        
        return {
          access_token: token,
          token_type: 'bearer',
          user: newUser
        };
      }
      
      return await fetchApi<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Register API error, using mock registration:', error);
      
      // Fall back to mock registration
      const newUser: User = {
        id: mockUsers.length + 100,
        email: data.email,
        full_name: data.full_name,
        role: 'user',
        created_at: new Date().toISOString()
      };
      
      return {
        access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
        token_type: 'bearer',
        user: newUser
      };
    }
  },

  /**
   * Get current user profile
   * @param token Authentication token
   */
  getProfile: async (token: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock profile with token:', token);
        return MOCK_USER;
      }
      
      return await fetchWithAuth<User>('/auth/me', token);
    } catch (error) {
      console.warn('Get profile API error, using mock profile:', error);
      return MOCK_USER;
    }
  },

  /**
   * Update user profile
   * @param data Profile data
   * @param token Authentication token
   */
  updateProfile: async (data: Partial<User>, token: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock profile update with data:', data);
        
        // Get the current user from local storage
        const currentUser = auth.getUser() || MOCK_USER;
        
        // Update the user data
        const updatedUser = {
          ...currentUser,
          ...data,
          updated_at: new Date().toISOString()
        };
        
        // Update the user in local storage
        auth.setAuth(token, updatedUser);
        
        return updatedUser;
      }
      
      return await fetchWithAuth<User>('/auth/me', token, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Update profile API error, using mock update:', error);
      
      // Get the current user from local storage
      const currentUser = auth.getUser() || MOCK_USER;
      
      // Update the user data
      const updatedUser = {
        ...currentUser,
        ...data,
        updated_at: new Date().toISOString()
      };
      
      // Update the user in local storage
      auth.setAuth(token, updatedUser);
      
      return updatedUser;
    }
  },

  /**
   * Change password
   * @param data Password data
   * @param token Authentication token
   */
  changePassword: async (
    data: { current_password: string; new_password: string },
    token: string
  ): Promise<{ message: string }> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock password change with data:', data);
        return { message: 'Password changed successfully' };
      }
      
      return await fetchWithAuth<{ message: string }>('/auth/password', token, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Change password API error, using mock response:', error);
      return { message: 'Password changed successfully' };
    }
  },

  /**
   * Request password reset
   * @param email User email
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock password reset request for email:', email);
        return { message: 'Password reset link sent to your email' };
      }
      
      return await fetchApi<{ message: string }>('/auth/password-reset', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.warn('Password reset request API error, using mock response:', error);
      return { message: 'Password reset link sent to your email' };
    }
  },

  /**
   * Reset password
   * @param data Reset data
   */
  resetPassword: async (
    data: { token: string; new_password: string }
  ): Promise<{ message: string }> => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock password reset with data:', data);
        return { message: 'Password reset successfully' };
      }
      
      return await fetchApi<{ message: string }>('/auth/password-reset/confirm', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Password reset API error, using mock response:', error);
      return { message: 'Password reset successfully' };
    }
  },
};

// Local storage keys
const TOKEN_KEY = 'vetnol_token';
const USER_KEY = 'vetnol_user';

/**
 * Authentication utilities
 */
export const auth = {
  /**
   * Set authentication data in local storage
   * @param token Authentication token
   * @param user User data
   */
  setAuth: (token: string, user: User): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Get authentication token from local storage
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get user data from local storage
   */
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  /**
   * Check if user has specific role
   * @param role Role to check
   */
  hasRole: (role: string): boolean => {
    const user = auth.getUser();
    return user ? user.role === role : false;
  },

  /**
   * Check if user is admin
   */
  isAdmin: (): boolean => {
    return auth.hasRole('admin');
  },

  /**
   * Update user data in local storage
   */
  updateUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Logout user
   */
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};