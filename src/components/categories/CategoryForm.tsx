'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number | null;
  is_active?: boolean;
  display_order?: number;
  icon?: string;
}

interface CategoryFormProps {
  initialData?: Partial<Category>;
  parentCategories: Category[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData = {},
  parentCategories,
  onSubmit,
  isSubmitting
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    slug: initialData.slug || '',
    description: initialData.description || '',
    parent_id: initialData.parent_id !== undefined ? initialData.parent_id : null,
    is_active: initialData.is_active !== undefined ? initialData.is_active : true,
    display_order: initialData.display_order || 0,
    icon: initialData.icon || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [autoSlug, setAutoSlug] = useState(!initialData.slug);

  // Generate slug from name if autoSlug is enabled
  useEffect(() => {
    if (autoSlug && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name, autoSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'name' && autoSlug) {
      // Slug will be updated by the effect
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'slug') {
      // If manually editing slug, disable auto-generation
      setAutoSlug(false);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'parent_id') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value === '' ? null : Number(value)
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      router.push('/dashboard/categories');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle API errors
      if (error && typeof error === 'object' && 'detail' in error) {
        setErrors(prev => ({ ...prev, form: error.detail as string }));
      } else {
        setErrors(prev => ({ ...prev, form: 'An error occurred while saving the category' }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{errors.form}</h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${
                errors.slug
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-green-500 focus:ring-green-500'
              }`}
            />
            {errors.slug && (
              <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              URL-friendly identifier. Auto-generated from name if left blank.
            </p>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Brief description of the category.
          </p>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700">
            Parent Category
          </label>
          <div className="mt-1">
            <select
              id="parent_id"
              name="parent_id"
              value={formData.parent_id === null ? '' : formData.parent_id}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="">None (Top-level category)</option>
              {parentCategories.map((category) => (
                <option 
                  key={category.id} 
                  value={category.id}
                  disabled={initialData.id === category.id} // Prevent self-reference
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">
            Display Order
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="display_order"
              id="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Icon URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="icon"
              id="icon"
              value={formData.icon}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            URL to an icon image for this category.
          </p>
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="is_active" className="font-medium text-gray-700">
                Active
              </label>
              <p className="text-gray-500">
                Inactive categories are hidden from the public site.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/dashboard/categories')}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : initialData.id ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;