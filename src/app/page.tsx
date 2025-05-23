'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import MainLayout from '@/components/layout/MainLayout';
import CategoryCard from '@/components/categories/CategoryCard';
import ArticleGrid from '@/components/articles/ArticleGrid';
import { articleApi } from '@/lib/api';

// Mock data for categories
const animalCategories = [
  {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    icon: '/images/categories/small-animals.jpg'
  },
  {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.',
    icon: '/images/categories/large-animals.jpg'
  },
  {
    id: 3,
    name: 'Poultry',
    slug: 'poultry',
    description: 'Information about chickens, ducks, and other poultry',
    icon: '/images/categories/poultry.jpg'
  },
  {
    id: 4,
    name: 'Pet Animals',
    slug: 'pet-animals',
    description: 'Information about dogs, cats, and other pets',
    icon: '/images/categories/pet-animals.jpg'
  },
  {
    id: 5,
    name: 'Zoo Animals',
    slug: 'zoo-animals',
    description: 'Information about exotic and zoo animals',
    icon: '/images/categories/zoo-animals.jpg'
  }
];

const topicCategories = [
  {
    id: 6,
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Information about feeding and nutrition',
    icon: '/images/categories/nutrition.jpg'
  },
  {
    id: 7,
    name: 'Diseases',
    slug: 'diseases',
    description: 'Information about common diseases and treatments',
    icon: '/images/categories/diseases.jpg'
  },
  {
    id: 8,
    name: 'Breeds',
    slug: 'breeds',
    description: 'Information about different breeds',
    icon: '/images/categories/breeds.jpg'
  },
  {
    id: 9,
    name: 'Management',
    slug: 'management',
    description: 'Information about animal management practices',
    icon: '/images/categories/management.jpg'
  }
];

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch featured articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const articles = await articleApi.getAll();
        // Use the first 3 articles as featured
        setFeaturedArticles(articles.slice(0, 3));
      } catch (err) {
        console.error('Error fetching articles:', err);
        // Use mock data as fallback
        setFeaturedArticles([
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
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/70"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Veterinary Knowledge for Everyone
            </h1>
            <p className="text-xl mb-6">
              From farmers to professional veterinarians, Vetnol connects the community with reliable veterinary information.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/categories" 
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold text-center"
              >
                Explore Categories
              </Link>
              <Link 
                href="/auth/register" 
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-6 py-3 rounded-md font-semibold text-center"
              >
                Join Community
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-64 md:h-80">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">Vetnol</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animal Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Animal Type</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of veterinary information organized by animal type
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {animalCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            <Link 
              href="/articles" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              View all articles →
            </Link>
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
              articles={featuredArticles}
              columns={3}
            />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Vetnol?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Expert Content</h3>
              <p className="text-gray-600 text-center">
                Articles, case studies, and research papers written and reviewed by veterinary professionals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Community Driven</h3>
              <p className="text-gray-600 text-center">
                Connect with farmers, veterinarians, and animal lovers to share experiences and knowledge.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Earn While You Learn</h3>
              <p className="text-gray-600 text-center">
                Get rewarded for your contributions with our unique monetization system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Topic</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find information organized by veterinary topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topicCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                variant="featured" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <Link href="/articles" className="text-green-600 hover:text-green-700 font-semibold">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Large Animals</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Common Diseases in Dairy Cattle and Prevention Methods</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Learn about the most common diseases affecting dairy cattle and how to prevent them effectively...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Dr. John Smith</span>
                  </div>
                  <span className="text-sm text-gray-500">May 15, 2024</span>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Pet Animals</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Nutrition Guide for Senior Dogs: What You Need to Know</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  As dogs age, their nutritional needs change. This comprehensive guide covers everything you need to know...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Dr. Emily Johnson</span>
                  </div>
                  <span className="text-sm text-gray-500">May 12, 2024</span>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Article Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Poultry</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Vaccination Schedules for Poultry: A Complete Guide</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Proper vaccination is crucial for poultry health. This guide provides detailed vaccination schedules...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Dr. Michael Chen</span>
                  </div>
                  <span className="text-sm text-gray-500">May 10, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up today to access exclusive content, connect with experts, and start earning from your contributions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/auth/register" 
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-md font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
