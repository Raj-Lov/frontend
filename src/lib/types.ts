// User Types
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'author' | 'user';
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Content Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: number | null;
  created_at: string;
  updated_at?: string;
  children?: Category[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category_id: number;
  author_id: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at?: string;
  category?: Category;
  author?: {
    id: number;
    full_name: string;
    avatar?: string;
  };
  comments?: Comment[];
  tags?: string[];
}

export interface Comment {
  id: number;
  article_id: number;
  article_title?: string;
  user_id: number;
  user_name: string;
  user_avatar?: string;
  content: string;
  parent_id?: number | null;
  created_at: string;
  updated_at?: string;
  replies?: Comment[];
}

// Search Types
export interface SearchResult {
  articles: Article[];
  categories?: Category[];
  tags?: string[];
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// API Error Types
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Payment Types
export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  transaction_id: string;
  created_at: string;
}

// Notification Types
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  created_at: string;
}

// Analytics Types
export interface ArticleAnalytics {
  article_id: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface UserAnalytics {
  user_id: number;
  total_articles: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  total_earnings: number;
}