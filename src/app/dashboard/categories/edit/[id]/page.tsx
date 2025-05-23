'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/layout/AdminLayout';
import CategoryForm from '@/components/categories/CategoryForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { handleErrorByType, ErrorType } from '@/lib/errors/errorHandler';

// Mock data - replace with actual API call
const mockCategories = {
  '1': {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    parent_id: null,
    is_active: true,
    display_order: 0
  },
  '2': {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.',
    parent_id: null,
    is_active: true,
    display_order: 1
  },
  '6': {
    id: 6,
    name: 'Nutrition (Small Animals)',
    slug: 'nutrition-small-animals',
    description: 'Information about feeding and nutrition',
    parent_id: 1,
    is_active: true,
    display_order: 0
  }
};

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

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string;
  
  const [category, setCategory] = useState<any>(null);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real implementation, fetch category and parent categories from API
  useEffect(() => {
    // Example:
    // const fetchData = async () => {
    //   setLoading(true);
    //   try {
    //     const [categoryData, parentCategoriesData] = await Promise.all([
    //       categoryApi.getById(Number(categoryId)),
    //       categoryApi.getAll()
    //     ]);
    //     setCategory(categoryData);
    //     setParentCategories(parentCategoriesData.filter(c => c.id !== Number(categoryId)));
    //   } catch (err) {
    //     setError('Failed to load category data');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    
    // Mock implementation
    setTimeout(() => {
      if (categoryId && mockCategories[categoryId as keyof typeof mockCategories]) {
        setCategory(mockCategories[categoryId as keyof typeof mockCategories]);
        // Filter out the current category from parent options to prevent circular references
        setParentCategories(mockParentCategories.filter(c => c.id !== Number(categoryId)));
      } else {
        setError('Category not found');
      }
      setLoading(false);
    }, 500);
  }, [categoryId]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, update category via API
      // Example:
      // await categoryApi.update(Number(categoryId), data, token);
      
      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Category updated:', data);
      
      // Success - redirect will happen in the form component
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading category data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !category) {
    // In a real implementation, redirect to 404 page
    // handleErrorByType(ErrorType.NOT_FOUND);
    
    return (
      <AdminLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error || 'Category not found'}</p>
          </div>
          <Link
            href="/dashboard/categories"
            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Back to Categories
          </Link>
        </div>
      </AdminLayout>
    );
  }

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
              Edit Category: {category.name}
            </h2>
          </div>
        </div>
        
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <CategoryForm
              initialData={category}
              parentCategories={parentCategories}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}