import { redirect } from 'next/navigation';

/**
 * Error types for the application
 */
export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SERVER_ERROR = 'SERVER_ERROR',
}

/**
 * Handle API errors and redirect to appropriate error pages
 * @param error The error object or HTTP status code
 * @param defaultMessage Default error message
 */
export function handleApiError(error: any, defaultMessage: string = 'An error occurred'): never {
  console.error('API Error:', error);
  
  // Handle error based on status code
  if (typeof error === 'number') {
    redirectBasedOnStatusCode(error);
  }
  
  // Handle error object with status property
  if (error && typeof error === 'object' && 'status' in error) {
    redirectBasedOnStatusCode(error.status);
  }
  
  // Handle error object with statusCode property
  if (error && typeof error === 'object' && 'statusCode' in error) {
    redirectBasedOnStatusCode(error.statusCode);
  }
  
  // Default to server error
  throw new Error(error?.message || defaultMessage);
}

/**
 * Redirect to appropriate error page based on status code
 * @param statusCode HTTP status code
 */
function redirectBasedOnStatusCode(statusCode: number): never {
  switch (statusCode) {
    case 401:
      redirect('/auth/login?error=unauthorized');
    case 403:
      redirect('/forbidden');
    case 404:
      redirect('/not-found');
    default:
      // For 500 and other errors, we'll let the error boundary handle it
      throw new Error(`Server error: ${statusCode}`);
  }
}

/**
 * Handle errors by error type
 * @param errorType The type of error
 * @param message Optional error message
 */
export function handleErrorByType(errorType: ErrorType, message?: string): never {
  switch (errorType) {
    case ErrorType.NOT_FOUND:
      redirect('/not-found');
    case ErrorType.FORBIDDEN:
      redirect('/forbidden');
    case ErrorType.UNAUTHORIZED:
      redirect('/auth/login?error=unauthorized');
    case ErrorType.SERVER_ERROR:
    default:
      throw new Error(message || 'Server error occurred');
  }
}