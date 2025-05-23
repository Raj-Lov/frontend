import { handleApiError } from './errors/errorHandler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
    return fetchApi<any[]>('/categories/');
  },

  /**
   * Get category tree
   */
  getTree: async () => {
    return fetchApi<any[]>('/categories/tree');
  },

  /**
   * Get category by ID
   * @param id Category ID
   */
  getById: async (id: number) => {
    return fetchApi<any>(`/categories/${id}`);
  },

  /**
   * Get category by slug
   * @param slug Category slug
   */
  getBySlug: async (slug: string) => {
    return fetchApi<any>(`/categories/slug/${slug}`);
  },

  /**
   * Get category with children
   * @param id Category ID
   */
  getWithChildren: async (id: number) => {
    return fetchApi<any>(`/categories/${id}/with-children`);
  },

  /**
   * Create category (admin only)
   * @param data Category data
   * @param token Authentication token
   */
  create: async (data: any, token: string) => {
    return fetchWithAuth<any>('/categories/', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update category (admin only)
   * @param id Category ID
   * @param data Category data
   * @param token Authentication token
   */
  update: async (id: number, data: any, token: string) => {
    return fetchWithAuth<any>(`/categories/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete category (admin only)
   * @param id Category ID
   * @param token Authentication token
   */
  delete: async (id: number, token: string) => {
    return fetchWithAuth<any>(`/categories/${id}`, token, {
      method: 'DELETE',
    });
  },
};