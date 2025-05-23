'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import CategoryGrid from '@/components/categories/CategoryGrid';
import CategoryBreadcrumb from '@/components/categories/CategoryBreadcrumb';
import ArticleGrid from '@/components/articles/ArticleGrid';
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
    const fetchCategory = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // First try to get the category by slug
        const response = await fetch(`http://localhost:8000/categories/slug/${slug}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const categoryData = await response.json();
        
        // Now get the children if any
        let childrenData = [];
        try {
          const childrenResponse = await fetch(`http://localhost:8000/categories?parent_id=${categoryData.id}`);
          if (childrenResponse.ok) {
            childrenData = await childrenResponse.json();
          }
        } catch (childErr) {
          console.error('Error fetching children:', childErr);
        }
        
        // Build breadcrumbs
        const breadcrumbs = [
          { name: 'Categories', href: '/categories', current: false },
        ];
        
        if (categoryData.parent_id) {
          try {
            const parentResponse = await fetch(`http://localhost:8000/categories/${categoryData.parent_id}`);
            if (parentResponse.ok) {
              const parentData = await parentResponse.json();
              breadcrumbs.push({
                name: parentData.name,
                href: `/categories/${parentData.slug}`,
                current: false
              });
            }
          } catch (parentErr) {
            console.error('Error fetching parent:', parentErr);
          }
        }
        
        breadcrumbs.push({
          name: categoryData.name,
          href: `/categories/${categoryData.slug}`,
          current: true
        });
        
        // Combine all data
        setCategory({
          ...categoryData,
          children: childrenData,
          breadcrumbs
        });
      } catch (err) {
        console.error('Error fetching category:', err);
        
        // Fallback to mock data if available
        if (mockCategoryData[slug as keyof typeof mockCategoryData]) {
          setCategory(mockCategoryData[slug as keyof typeof mockCategoryData]);
          setError('Using mock data (API error)');
        } else {
          setError('Category not found');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategory();
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

        {/* Mock articles related to this category */}
        <div className="mt-12">
          <ArticleGrid 
            title="Related Articles"
            viewAllLink={`/articles?category=${category.slug}`}
            articles={[
              {
                id: 1,
                title: `Understanding ${category.name} Health and Wellness`,
                slug: `understanding-${category.slug}-health`,
                excerpt: `A comprehensive guide to maintaining optimal health for ${category.name.toLowerCase()}.`,
                publishedAt: new Date().toISOString(),
                author: {
                  name: 'Dr. Veterinary Expert'
                },
                category: {
                  name: category.name,
                  slug: category.slug
                }
              },
              {
                id: 2,
                title: `Common Diseases in ${category.name}`,
                slug: `common-diseases-in-${category.slug}`,
                excerpt: `Learn about the most frequent health issues affecting ${category.name.toLowerCase()} and how to identify them early.`,
                publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                author: {
                  name: 'Veterinary Specialist'
                },
                category: {
                  name: category.name,
                  slug: category.slug
                }
              },
              {
                id: 3,
                title: `Nutrition Guide for ${category.name}`,
                slug: `nutrition-guide-for-${category.slug}`,
                excerpt: `Essential nutritional information to keep your ${category.name.toLowerCase()} healthy and thriving.`,
                publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                author: {
                  name: 'Animal Nutritionist'
                },
                category: {
                  name: category.name,
                  slug: category.slug
                }
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
}