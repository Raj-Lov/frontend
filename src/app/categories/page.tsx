'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CategoryGrid from '@/components/categories/CategoryGrid';
import CategoryTree from '@/components/categories/CategoryTree';
import CategoryBreadcrumb from '@/components/categories/CategoryBreadcrumb';

// Mock data - replace with actual API call
const mockCategories = [
  {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    level: 0,
    children: [
      {
        id: 6,
        name: 'Nutrition (Small Animals)',
        slug: 'nutrition-small-animals',
        description: 'Information about feeding and nutrition',
        level: 1,
        children: []
      },
      {
        id: 7,
        name: 'Diseases (Small Animals)',
        slug: 'diseases-small-animals',
        description: 'Information about common diseases and treatments',
        level: 1,
        children: []
      }
    ]
  },
  {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.',
    level: 0,
    children: []
  },
  {
    id: 3,
    name: 'Poultry',
    slug: 'poultry',
    description: 'Information about chickens, ducks, and other poultry',
    level: 0,
    children: []
  },
  {
    id: 4,
    name: 'Pet Animals',
    slug: 'pet-animals',
    description: 'Information about dogs, cats, and other pets',
    level: 0,
    children: []
  },
  {
    id: 5,
    name: 'Zoo Animals',
    slug: 'zoo-animals',
    description: 'Information about exotic and zoo animals',
    level: 0,
    children: []
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real implementation, fetch categories from API
  useEffect(() => {
    // Fetch categories from API
    // Example:
    // const fetchCategories = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('/api/categories/tree');
    //     const data = await response.json();
    //     setCategories(data);
    //   } catch (err) {
    //     setError('Failed to load categories');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCategories();
  }, []);

  const breadcrumbs = [
    { name: 'Categories', href: '/categories', current: true }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <CategoryBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CategoryTree categories={categories} />
            </div>
            <div className="lg:col-span-3">
              <CategoryGrid 
                categories={categories} 
                title="Main Categories" 
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}