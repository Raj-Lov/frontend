'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ArticleGrid from '@/components/articles/ArticleGrid';
import Link from 'next/link';
import { articleApi, categoryApi } from '@/lib/api';

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: 'Understanding Small Animals Health and Wellness',
    slug: 'understanding-small-animals-health',
    excerpt: 'A comprehensive guide to maintaining optimal health for small animals.',
    publishedAt: new Date().toISOString(),
    author: {
      name: 'Dr. Veterinary Expert'
    },
    category: {
      name: 'Small Animals',
      slug: 'small-animals'
    }
  },
  {
    id: 2,
    title: 'Common Diseases in Large Animals',
    slug: 'common-diseases-in-large-animals',
    excerpt: 'Learn about the most frequent health issues affecting large animals and how to identify them early.',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Veterinary Specialist'
    },
    category: {
      name: 'Large Animals',
      slug: 'large-animals'
    }
  },
  {
    id: 3,
    title: 'Nutrition Guide for Poultry',
    slug: 'nutrition-guide-for-poultry',
    excerpt: 'Essential nutritional information to keep your poultry healthy and thriving.',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Animal Nutritionist'
    },
    category: {
      name: 'Poultry',
      slug: 'poultry'
    }
  },
  {
    id: 4,
    title: 'Pet Animals: Vaccination Schedule',
    slug: 'pet-animals-vaccination-schedule',
    excerpt: 'A complete guide to vaccinations for your pets - when and why they need them.',
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Pet Care Specialist'
    },
    category: {
      name: 'Pet Animals',
      slug: 'pet-animals'
    }
  },
  {
    id: 5,
    title: 'Zoo Animals: Habitat Requirements',
    slug: 'zoo-animals-habitat-requirements',
    excerpt: 'Understanding the specific habitat needs for various zoo animals.',
    publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Zoo Veterinarian'
    },
    category: {
      name: 'Zoo Animals',
      slug: 'zoo-animals'
    }
  },
  {
    id: 6,
    title: 'Breeding Techniques for Small Animals',
    slug: 'breeding-techniques-small-animals',
    excerpt: 'Modern approaches to breeding small animals for health and genetic diversity.',
    publishedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Breeding Expert'
    },
    category: {
      name: 'Small Animals',
      slug: 'small-animals'
    }
  }
];

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams?.get('category');
  
  const [articles, setArticles] = useState(mockArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let articlesData;
        let categoryNameData = null;
        
        if (categorySlug) {
          // Try to get category info first
          try {
            const categoryData = await categoryApi.getBySlug(categorySlug);
            categoryNameData = categoryData.name;
          } catch (err) {
            console.error('Error fetching category:', err);
            categoryNameData = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' ');
          }
          
          // Get articles filtered by category
          articlesData = await articleApi.getAll(undefined, categorySlug);
        } else {
          // Get all articles
          articlesData = await articleApi.getAll();
        }
        
        setArticles(articlesData);
        setCategoryName(categoryNameData);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Using mock data instead.');
        
        // Fallback to mock data
        if (categorySlug) {
          const filtered = mockArticles.filter(article => 
            article.category?.slug === categorySlug
          );
          
          setArticles(filtered);
          
          // Set category name for display
          if (filtered.length > 0) {
            setCategoryName(filtered[0].category?.name || null);
          } else {
            setCategoryName(categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' '));
          }
        } else {
          setArticles(mockArticles);
          setCategoryName(null);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [categorySlug]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryName ? `Articles: ${categoryName}` : 'All Articles'}
          </h1>
          
          {categoryName && (
            <div className="mb-4">
              <Link 
                href="/articles"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to All Articles
              </Link>
            </div>
          )}
          
          <p className="text-gray-600">
            {categoryName 
              ? `Browse our collection of articles about ${categoryName.toLowerCase()}.`
              : 'Explore our comprehensive collection of veterinary articles.'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <ArticleGrid 
            articles={articles}
            columns={3}
          />
        )}
        
        {articles.length === 0 && !loading && !error && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              No articles found for this category.
            </p>
            <Link 
              href="/articles"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View all articles
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}