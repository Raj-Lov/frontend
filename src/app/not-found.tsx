'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  // Optional: Track 404 errors
  useEffect(() => {
    // You could log this to your analytics service
    console.log('404 error occurred');
  }, []);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-red-100 p-4 mb-6">
            <div className="rounded-full bg-red-200 p-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Page not found</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Go back home
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Browse categories
            </Link>
          </div>
          
          <div className="mt-12">
            <p className="text-base text-gray-500">
              Need help? <Link href="/contact" className="text-green-600 hover:text-green-500 font-medium">Contact support</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}