'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ArticleEditor from '@/components/articles/ArticleEditor';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Article } from '@/lib/types';

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const articleId = parseInt(params.id);

  // Check if user is authenticated and authorized to edit this article
  useEffect(() => {
    const checkAuthAndFetchArticle = async () => {
      const user = auth.getUser();
      if (!user) {
        router.push(`/login?redirect=/dashboard/articles/edit/${params.id}`);
        return;
      }

      try {
        const articleData = await api.getArticleById(articleId);
        
        // Check if the user is the author or an admin
        if (articleData.author_id !== user.id && user.role !== 'admin') {
          setError('You are not authorized to edit this article');
          return;
        }
        
        setArticle(articleData);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. It may have been deleted or you may not have permission to view it.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isNaN(articleId)) {
      checkAuthAndFetchArticle();
    } else {
      setError('Invalid article ID');
      setIsLoading(false);
    }
  }, [articleId, params.id, router]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-gray-700 mb-4">{error}</p>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <ArticleEditor articleId={articleId} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}