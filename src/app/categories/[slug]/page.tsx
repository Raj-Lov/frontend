'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import CategoryGrid from '@/components/categories/CategoryGrid';
import CategoryBreadcrumb from '@/components/categories/CategoryBreadcrumb';
import Link from 'next/link';

// Mock data - replace with actual API call
const mockCategoryData = {
  'small-animals': {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    parent_id: null,
    children: [
      {
        id: 6,
        name: 'Nutrition (Small Animals)',
        slug: 'nutrition-small-animals',
        description: 'Information about feeding and nutrition',
        parent_id: 1
      },
      {
        id: 7,
        name: 'Diseases (Small Animals)',
        slug: 'diseases-small-animals',
        description: 'Information about common diseases and treatments',
        parent_id: 1
      },
      {
        id: 8,
        name: 'Breeds (Small Animals)',
        slug: 'breeds-small-animals',
        description: 'Information about different breeds',
        parent_id: 1
      }
    ],
    breadcrumbs: [
      { name: 'Categories', href: '/categories', current: false },
      { name: 'Small Animals', href: '/categories/small-animals', current: true }
    ]
  },
  'nutrition-small-animals': {
    id: 6,
    name: 'Nutrition (Small Animals)',
    slug: 'nutrition-small-animals',
    description: 'Information about feeding and nutrition for small animals',
    parent_id: 1,
    children: [
      {
        id: 11,
        name: 'Feed Types (Nutrition (Small Animals))',
        slug: 'feed-types-nutrition-small-animals',
        description: 'Types of feed for small animals',
        parent_id: 6
      },
      {
        id: 12,
        name: 'Feeding Schedules (Nutrition (Small Animals))',
        slug: 'feeding-schedules-nutrition-small-animals',
        description: 'Recommended feeding schedules for small animals',
        parent_id: 6
      }
    ],
    breadcrumbs: [
      { name: 'Categories', href: '/categories', current: false },
      { name: 'Small Animals', href: '/categories/small-animals', current: false },
      { name: 'Nutrition', href: '/categories/nutrition-small-animals', current: true }
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, fetch category data from API
    // Example:
    // const fetchCategory = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`/api/categories/slug/${slug}`);
    //     const data = await response.json();
    //     setCategory(data);
    //   } catch (err) {
    //     setError('Failed to load category');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCategory();
    
    // Mock implementation
    setTimeout(() => {
      if (slug && mockCategoryData[slug as keyof typeof mockCategoryData]) {
        setCategory(mockCategoryData[slug as keyof typeof mockCategoryData]);
      } else {
        setError('Category not found');
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading category...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !category) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error || 'Category not found'}</p>
          </div>
          <Link 
            href="/categories"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Categories
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <CategoryBreadcrumb breadcrumbs={category.breadcrumbs} />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        {category.children && category.children.length > 0 ? (
          <CategoryGrid 
            categories={category.children} 
            title="Subcategories" 
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              No subcategories found for this category.
            </p>
            <p className="text-gray-600">
              Check back later for content or explore other categories.
            </p>
          </div>
        )}

        {/* In a real implementation, you would display articles related to this category here */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              No articles found for this category yet.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}