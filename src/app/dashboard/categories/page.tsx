'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API call
const mockCategories = [
  {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    parent_id: null,
    level: 0
  },
  {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.',
    parent_id: null,
    level: 0
  },
  {
    id: 6,
    name: 'Nutrition (Small Animals)',
    slug: 'nutrition-small-animals',
    description: 'Information about feeding and nutrition',
    parent_id: 1,
    level: 1
  },
  {
    id: 7,
    name: 'Diseases (Small Animals)',
    slug: 'diseases-small-animals',
    description: 'Information about common diseases and treatments',
    parent_id: 1,
    level: 1
  }
];

export default function CategoriesAdminPage() {
  const router = useRouter();
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [parentFilter, setParentFilter] = useState<number | null>(null);

  // In a real implementation, fetch categories from API
  useEffect(() => {
    // Fetch categories from API
    // Example:
    // const fetchCategories = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await categoryApi.getAll();
    //     setCategories(response);
    //   } catch (err) {
    //     setError('Failed to load categories');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCategories();
  }, []);

  // Filter categories based on search term and parent filter
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesParent = parentFilter === null || category.parent_id === parentFilter;
    return matchesSearch && matchesParent;
  });

  // Get unique parent categories for filter dropdown
  const parentCategories = categories.filter(category => category.parent_id === null);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      // In a real implementation, delete category via API
      // Example:
      // try {
      //   await categoryApi.delete(id, token);
      //   setCategories(categories.filter(category => category.id !== id));
      // } catch (err) {
      //   setError('Failed to delete category');
      //   console.error(err);
      // }
      
      // Mock implementation
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage categories for organizing content on the website.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/dashboard/categories/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Category
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col">
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                Filter by Parent
              </label>
              <div className="mt-1">
                <select
                  id="parent"
                  name="parent"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  value={parentFilter === null ? '' : parentFilter}
                  onChange={(e) => setParentFilter(e.target.value === '' ? null : Number(e.target.value))}
                >
                  <option value="">All Categories</option>
                  <option value="null">Top-level Categories</option>
                  {parentCategories.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Slug
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Parent
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Level
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredCategories.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-sm text-gray-500">
                            No categories found
                          </td>
                        </tr>
                      ) : (
                        filteredCategories.map((category) => (
                          <tr key={category.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {category.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {category.slug}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {category.parent_id ? 
                                categories.find(c => c.id === category.parent_id)?.name || 'Unknown' : 
                                'None'}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {category.level}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  href={`/dashboard/categories/edit/${category.id}`}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="sr-only">Edit {category.name}</span>
                                </Link>
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="sr-only">Delete {category.name}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}