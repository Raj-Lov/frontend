'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function ForbiddenPage() {
  // Optional: Track 403 errors
  useEffect(() => {
    // You could log this to your analytics service
    console.log('403 error occurred');
  }, []);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-orange-100 p-4 mb-6">
            <div className="rounded-full bg-orange-200 p-4">
              <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Access Denied</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Sorry, you don't have permission to access this page. Please log in with an account that has the required permissions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Log in
            </Link>
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
        </div>
      </div>
    </MainLayout>
  );
}