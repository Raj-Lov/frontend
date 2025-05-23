'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import CategoryForm from '@/components/categories/CategoryForm';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API call
const mockParentCategories = [
  {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.'
  },
  {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.'
  },
  {
    id: 3,
    name: 'Poultry',
    slug: 'poultry',
    description: 'Information about chickens, ducks, and other poultry'
  },
  {
    id: 4,
    name: 'Pet Animals',
    slug: 'pet-animals',
    description: 'Information about dogs, cats, and other pets'
  },
  {
    id: 5,
    name: 'Zoo Animals',
    slug: 'zoo-animals',
    description: 'Information about exotic and zoo animals'
  }
];

export default function NewCategoryPage() {
  const [parentCategories, setParentCategories] = useState(mockParentCategories);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real implementation, fetch parent categories from API
  useEffect(() => {
    // Fetch parent categories from API
    // Example:
    // const fetchParentCategories = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await categoryApi.getAll();
    //     setParentCategories(response);
    //   } catch (err) {
    //     setError('Failed to load parent categories');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchParentCategories();
  }, []);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, create category via API
      // Example:
      // await categoryApi.create(data, token);
      
      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Category created:', data);
      
      // Success - redirect will happen in the form component
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard/categories"
            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Back to Categories
          </Link>
        </div>
        
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Create New Category
            </h2>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <CategoryForm
                parentCategories={parentCategories}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}