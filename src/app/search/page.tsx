'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ArticleGrid from '@/components/articles/ArticleGrid';
import CategoryGrid from '@/components/categories/CategoryGrid';
import { searchApi } from '@/lib/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<any>({ articles: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(query);

  // Perform search when query changes
  useEffect(() => {
    if (!query) return;
    
    const performSearch = async () => {
      setLoading(true);
      try {
        const results = await searchApi.search(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching:', err);
        setError('Failed to perform search');
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url.toString());
    
    // Perform search
    const performSearch = async () => {
      setLoading(true);
      try {
        const results = await searchApi.search(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching:', err);
        setError('Failed to perform search');
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex w-full max-w-2xl mx-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, categories..."
                className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-r-md flex items-center justify-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
              Search
            </button>
          </div>
        </form>
        
        {/* Search Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Searching...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <>
            {query && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing results for: <span className="font-semibold">{query}</span>
                </p>
              </div>
            )}
            
            {/* Categories Results */}
            {searchResults.categories && searchResults.categories.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
                <CategoryGrid categories={searchResults.categories} />
              </div>
            )}
            
            {/* Articles Results */}
            {searchResults.articles && searchResults.articles.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles</h2>
                <ArticleGrid articles={searchResults.articles} />
              </div>
            ) : query && !loading && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 mb-4">No results found for "{query}"</p>
                <p className="text-gray-600">
                  Try different keywords or browse our{' '}
                  <Link href="/categories" className="text-green-600 hover:text-green-700">
                    categories
                  </Link>
                </p>
              </div>
            )}
          </>
        )}
        
        {!query && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              Enter a search term to find articles and categories
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}