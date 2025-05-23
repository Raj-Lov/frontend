'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ArticleEditor from '@/components/articles/ArticleEditor';
import { auth } from '@/lib/auth';

export default function NewArticlePage() {
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const user = auth.getUser();
    if (!user) {
      router.push('/login?redirect=/dashboard/articles/new');
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <ArticleEditor />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}