'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-red-100 p-4 mb-6">
              <div className="rounded-full bg-red-200 p-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Application Error</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
              We're sorry, but a critical error has occurred. Our team has been notified and is working to resolve the issue.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Go back home
              </a>
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
      </body>
    </html>
  );
}