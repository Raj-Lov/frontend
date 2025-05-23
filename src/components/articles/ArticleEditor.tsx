'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import { Article, Category } from '@/lib/types';

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface ArticleEditorProps {
  articleId?: number; // If provided, we're editing an existing article
}

export default function ArticleEditor({ articleId }: ArticleEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    category_id: 0,
    is_featured: false,
    featured_image: ''
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  // If editing, fetch the article data
  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        setIsLoading(true);
        try {
          const articleData = await api.getArticleById(articleId);
          setArticle(articleData);
        } catch (error) {
          console.error('Error fetching article:', error);
          setError('Failed to load article. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchArticle();
    }
  }, [articleId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setArticle(prev => ({ ...prev, [name]: checked }));
    } else {
      setArticle(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle rich text editor changes
  const handleEditorChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    // Validate form
    if (!article.title || !article.content || !article.category_id) {
      setError('Please fill in all required fields');
      setIsSaving(false);
      return;
    }

    try {
      // Get the current user
      const user = auth.getUser();
      if (!user) {
        setError('You must be logged in to save an article');
        setIsSaving(false);
        return;
      }

      // Prepare article data
      const articleData = {
        ...article,
        author_id: user.id
      };

      let response;
      if (articleId) {
        // Update existing article
        response = await api.updateArticle(articleId, articleData as Article);
      } else {
        // Create new article
        response = await api.createArticle(articleData as Article);
      }

      // Redirect to the article page
      router.push(`/articles/${response.slug}`);
    } catch (error) {
      console.error('Error saving article:', error);
      setError('Failed to save article. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {articleId ? 'Edit Article' : 'Create New Article'}
      </h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            Excerpt <span className="text-red-500">*</span>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={article.excerpt}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            A brief summary of the article (max 200 characters)
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category_id"
            name="category_id"
            value={article.category_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Image */}
        <div>
          <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
            Featured Image URL
          </label>
          <input
            type="text"
            id="featured_image"
            name="featured_image"
            value={article.featured_image}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            URL to the featured image for this article
          </p>
        </div>

        {/* Is Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_featured"
            name="is_featured"
            checked={article.is_featured}
            onChange={(e) => setArticle(prev => ({ ...prev, is_featured: e.target.checked }))}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
            Feature this article on the homepage
          </label>
        </div>

        {/* Content Editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          {typeof window !== 'undefined' && (
            <ReactQuill
              theme="snow"
              value={article.content}
              onChange={handleEditorChange}
              modules={modules}
              className="h-64 mb-12"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : articleId ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  );
}