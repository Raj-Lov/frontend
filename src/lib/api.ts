import { handleApiError } from './errors/errorHandler';
import { mockArticles, mockCategories, mockComments, mockSearchResults } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false;

/**
 * Fetch wrapper with error handling
 * @param endpoint API endpoint
 * @param options Fetch options
 * @returns Response data
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      return handleApiError(response.status, `API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error, `Failed to fetch from ${endpoint}`);
  }
}

/**
 * Fetch wrapper with authentication
 * @param endpoint API endpoint
 * @param token Authentication token
 * @param options Fetch options
 * @returns Response data
 */
export async function fetchWithAuth<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  return fetchApi<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Category API functions
 */
export const categoryApi = {
  /**
   * Get all categories
   */
  getAll: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock category data');
        return mockCategories;
      }
      return await fetchApi<any[]>('/categories/');
    } catch (error) {
      console.warn('Error fetching categories, using mock data:', error);
      return mockCategories;
    }
  },

  /**
   * Get category tree
   */
  getTree: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock category tree data');
        return mockCategories;
      }
      return await fetchApi<any[]>('/categories/tree');
    } catch (error) {
      console.warn('Error fetching category tree, using mock data:', error);
      return mockCategories;
    }
  },

  /**
   * Get category by ID
   * @param id Category ID
   */
  getById: async (id: number) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock category data for ID:', id);
        const category = mockCategories.find(c => c.id === id);
        if (!category) throw new Error('Category not found');
        return category;
      }
      return await fetchApi<any>(`/categories/${id}`);
    } catch (error) {
      console.warn(`Error fetching category ${id}, using mock data:`, error);
      const category = mockCategories.find(c => c.id === id);
      if (!category) throw new Error('Category not found');
      return category;
    }
  },

  /**
   * Get category by slug
   * @param slug Category slug
   */
  getBySlug: async (slug: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock category data for slug:', slug);
        const category = mockCategories.find(c => c.slug === slug);
        if (!category) throw new Error('Category not found');
        return category;
      }
      return await fetchApi<any>(`/categories/slug/${slug}`);
    } catch (error) {
      console.warn(`Error fetching category ${slug}, using mock data:`, error);
      const category = mockCategories.find(c => c.slug === slug);
      if (!category) throw new Error('Category not found');
      return category;
    }
  },

  /**
   * Get category with children
   * @param id Category ID
   */
  getWithChildren: async (id: number) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock category data with children for ID:', id);
        const category = mockCategories.find(c => c.id === id);
        if (!category) throw new Error('Category not found');
        return category;
      }
      return await fetchApi<any>(`/categories/${id}/with-children`);
    } catch (error) {
      console.warn(`Error fetching category ${id} with children, using mock data:`, error);
      const category = mockCategories.find(c => c.id === id);
      if (!category) throw new Error('Category not found');
      return category;
    }
  },

  /**
   * Create category (admin only)
   * @param data Category data
   * @param token Authentication token
   */
  create: async (data: any, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Creating category', data);
        return { ...data, id: Math.floor(Math.random() * 1000) + 100 };
      }
      return await fetchWithAuth<any>('/categories/', token, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  /**
   * Update category (admin only)
   * @param id Category ID
   * @param data Category data
   * @param token Authentication token
   */
  update: async (id: number, data: any, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Updating category', id, data);
        return { ...data, id };
      }
      return await fetchWithAuth<any>(`/categories/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  /**
   * Delete category (admin only)
   * @param id Category ID
   * @param token Authentication token
   */
  delete: async (id: number, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Deleting category', id);
        return { message: 'Category deleted successfully' };
      }
      return await fetchWithAuth<any>(`/categories/${id}`, token, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};

/**
 * Search API
 */
export const searchApi = {
  /**
   * Search for articles and categories
   * @param query Search query
   * @param limit Maximum number of results to return
   */
  search: async (query: string, limit: number = 10) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock search data for query:', query);
        
        // Simple search implementation for mock data
        const lowerQuery = query.toLowerCase();
        
        const articles = mockArticles
          .filter(a => 
            a.title.toLowerCase().includes(lowerQuery) || 
            a.excerpt.toLowerCase().includes(lowerQuery) ||
            a.content.toLowerCase().includes(lowerQuery) ||
            a.category.name.toLowerCase().includes(lowerQuery)
          )
          .slice(0, limit);
        
        const categories = mockCategories
          .filter(c => 
            c.name.toLowerCase().includes(lowerQuery) || 
            (c.description && c.description.toLowerCase().includes(lowerQuery))
          )
          .slice(0, limit);
        
        return { articles, categories };
      }
      return await fetchApi<any>(`/search/?q=${encodeURIComponent(query)}&limit=${limit}`);
    } catch (error) {
      console.warn('Error performing search, using mock data:', error);
      
      if (query) {
        // Simple search implementation for mock data
        const lowerQuery = query.toLowerCase();
        
        const articles = mockArticles
          .filter(a => 
            a.title.toLowerCase().includes(lowerQuery) || 
            a.excerpt.toLowerCase().includes(lowerQuery) ||
            a.content.toLowerCase().includes(lowerQuery) ||
            a.category.name.toLowerCase().includes(lowerQuery)
          )
          .slice(0, limit);
        
        const categories = mockCategories
          .filter(c => 
            c.name.toLowerCase().includes(lowerQuery) || 
            (c.description && c.description.toLowerCase().includes(lowerQuery))
          )
          .slice(0, limit);
        
        return { articles, categories };
      }
      
      return mockSearchResults;
    }
  }
};

/**
 * Comments API functions
 */
export const commentsApi = {
  /**
   * Get comments for an article
   * @param articleId Article ID
   */
  getForArticle: async (articleId: number) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock comments data for article ID:', articleId);
        return mockComments.filter(c => c.article_id === articleId);
      }
      return await fetchApi<any[]>(`/articles/${articleId}/comments`);
    } catch (error) {
      console.warn(`Error fetching comments for article ${articleId}, using mock data:`, error);
      return mockComments.filter(c => c.article_id === articleId);
    }
  },

  /**
   * Create a comment
   * @param articleId Article ID
   * @param content Comment content
   * @param parentId Optional parent comment ID for replies
   * @param token Authentication token
   */
  create: async (articleId: number, content: string, parentId: number | null, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Creating comment', { articleId, content, parentId });
        const user = {
          id: 10,
          full_name: 'Mock User',
          avatar: null
        };
        
        const newComment = {
          id: Math.floor(Math.random() * 1000) + 100,
          content,
          article_id: articleId,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          parent_id: parentId,
          user
        };
        
        return newComment;
      }
      
      return await fetchWithAuth<any>(
        `/articles/${articleId}/comments`,
        token,
        {
          method: 'POST',
          body: JSON.stringify({
            content,
            article_id: articleId,
            parent_id: parentId,
          }),
        }
      );
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  /**
   * Update a comment
   * @param commentId Comment ID
   * @param content Updated comment content
   * @param token Authentication token
   */
  update: async (commentId: number, content: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Updating comment', { commentId, content });
        const comment = mockComments.find(c => c.id === commentId);
        if (!comment) throw new Error('Comment not found');
        
        const updatedComment = {
          ...comment,
          content,
          updated_at: new Date().toISOString()
        };
        
        return updatedComment;
      }
      
      return await fetchWithAuth<any>(
        `/comments/${commentId}`,
        token,
        {
          method: 'PUT',
          body: JSON.stringify({
            content,
          }),
        }
      );
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  /**
   * Delete a comment
   * @param commentId Comment ID
   * @param token Authentication token
   */
  delete: async (commentId: number, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Deleting comment', commentId);
        return { message: 'Comment deleted successfully' };
      }
      
      return await fetchWithAuth<any>(
        `/comments/${commentId}`,
        token,
        {
          method: 'DELETE',
        }
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

/**
 * Article API functions
 */
export const articleApi = {
  /**
   * Get all articles
   * @param categoryId Optional category ID to filter by
   * @param categorySlug Optional category slug to filter by
   */
  getAll: async (categoryId?: number, categorySlug?: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock article data');
        let filteredArticles = [...mockArticles];
        
        if (categoryId) {
          filteredArticles = filteredArticles.filter(a => a.category_id === categoryId);
        }
        
        if (categorySlug) {
          filteredArticles = filteredArticles.filter(a => a.category.slug === categorySlug);
        }
        
        return filteredArticles;
      }
      
      let endpoint = '/articles/';
      const params = new URLSearchParams();
      
      if (categoryId) {
        params.append('category_id', categoryId.toString());
      }
      
      if (categorySlug) {
        params.append('category_slug', categorySlug);
      }
      
      const queryString = params.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
      
      return await fetchApi<any[]>(endpoint);
    } catch (error) {
      console.warn('Error fetching articles, using mock data:', error);
      let filteredArticles = [...mockArticles];
      
      if (categoryId) {
        filteredArticles = filteredArticles.filter(a => a.category_id === categoryId);
      }
      
      if (categorySlug) {
        filteredArticles = filteredArticles.filter(a => a.category.slug === categorySlug);
      }
      
      return filteredArticles;
    }
  },

  /**
   * Get article by ID
   * @param id Article ID
   */
  getById: async (id: number) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock article data for ID:', id);
        const article = mockArticles.find(a => a.id === id);
        if (!article) throw new Error('Article not found');
        return article;
      }
      return await fetchApi<any>(`/articles/${id}`);
    } catch (error) {
      console.warn(`Error fetching article ${id}, using mock data:`, error);
      const article = mockArticles.find(a => a.id === id);
      if (!article) throw new Error('Article not found');
      return article;
    }
  },

  /**
   * Get article by slug
   * @param slug Article slug
   */
  getBySlug: async (slug: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock article data for slug:', slug);
        const article = mockArticles.find(a => a.slug === slug);
        if (!article) throw new Error('Article not found');
        return article;
      }
      return await fetchApi<any>(`/articles/slug/${slug}`);
    } catch (error) {
      console.warn(`Error fetching article ${slug}, using mock data:`, error);
      const article = mockArticles.find(a => a.slug === slug);
      if (!article) throw new Error('Article not found');
      return article;
    }
  },

  /**
   * Get related articles
   * @param id Article ID
   * @param limit Number of related articles to return
   */
  getRelated: async (id: number, limit: number = 3) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock related articles data for ID:', id);
        const article = mockArticles.find(a => a.id === id);
        if (!article) return [];
        
        // Get articles in the same category
        const relatedArticles = mockArticles
          .filter(a => a.id !== id && a.category_id === article.category_id)
          .slice(0, limit);
        
        // If we don't have enough, add some random articles
        if (relatedArticles.length < limit) {
          const otherArticles = mockArticles
            .filter(a => a.id !== id && !relatedArticles.find(r => r.id === a.id))
            .slice(0, limit - relatedArticles.length);
          
          return [...relatedArticles, ...otherArticles];
        }
        
        return relatedArticles;
      }
      return await fetchApi<any[]>(`/articles/related/${id}?limit=${limit}`);
    } catch (error) {
      console.warn(`Error fetching related articles for ${id}, using mock data:`, error);
      const article = mockArticles.find(a => a.id === id);
      if (!article) return [];
      
      // Get articles in the same category
      const relatedArticles = mockArticles
        .filter(a => a.id !== id && a.category_id === article.category_id)
        .slice(0, limit);
      
      // If we don't have enough, add some random articles
      if (relatedArticles.length < limit) {
        const otherArticles = mockArticles
          .filter(a => a.id !== id && !relatedArticles.find(r => r.id === a.id))
          .slice(0, limit - relatedArticles.length);
        
        return [...relatedArticles, ...otherArticles];
      }
      
      return relatedArticles;
    }
  },

  /**
   * Create article (admin only)
   * @param data Article data
   * @param token Authentication token
   */
  create: async (data: any, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Creating article', data);
        return { 
          ...data, 
          id: Math.floor(Math.random() * 1000) + 100,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString()
        };
      }
      return await fetchWithAuth<any>('/articles/', token, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  /**
   * Update article (admin only)
   * @param id Article ID
   * @param data Article data
   * @param token Authentication token
   */
  update: async (id: number, data: any, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Updating article', id, data);
        return { 
          ...data, 
          id,
          updated_at: new Date().toISOString()
        };
      }
      return await fetchWithAuth<any>(`/articles/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  },

  /**
   * Delete article (admin only)
   * @param id Article ID
   * @param token Authentication token
   */
  delete: async (id: number, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Mock: Deleting article', id);
        return { message: 'Article deleted successfully' };
      }
      return await fetchWithAuth<any>(`/articles/${id}`, token, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  },
};