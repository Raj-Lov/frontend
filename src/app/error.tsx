'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-yellow-100 p-4 mb-6">
            <div className="rounded-full bg-yellow-200 p-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Something went wrong</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            We're sorry, but we encountered an unexpected error. Our team has been notified and is working to fix the issue.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Go back home
            </Link>
          </div>
          
          <div className="mt-12">
            <p className="text-base text-gray-500">
              Need help? <Link href="/contact" className="text-green-600 hover:text-green-500 font-medium">Contact support</Link>
            </p>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md text-left max-w-2xl mx-auto">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Error details (visible in development only):</h3>
              <p className="text-xs text-gray-600 font-mono overflow-auto">
                {error.message}
                {error.stack && (
                  <span className="block mt-2 text-gray-500">{error.stack}</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}