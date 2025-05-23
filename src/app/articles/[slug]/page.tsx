'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ArticleGrid from '@/components/articles/ArticleGrid';
import CommentSection from '@/components/comments/CommentSection';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { articleApi } from '@/lib/api';

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: 'Understanding Small Animals Health and Wellness',
    slug: 'understanding-small-animals-health',
    excerpt: 'A comprehensive guide to maintaining optimal health for small animals.',
    content: `
      <p>Small animals require special care and attention to maintain their health and wellness. This comprehensive guide will help you understand the unique needs of small animals and how to provide the best care for them.</p>
      
      <h2>Nutrition</h2>
      <p>Proper nutrition is essential for small animals. They require a balanced diet that includes proteins, carbohydrates, fats, vitamins, and minerals. The specific nutritional needs vary depending on the species, age, and health status of the animal.</p>
      
      <h2>Housing</h2>
      <p>Small animals need appropriate housing that provides shelter, security, and comfort. The housing should be spacious enough for the animal to move around freely and should include areas for feeding, sleeping, and exercise.</p>
      
      <h2>Health Care</h2>
      <p>Regular health check-ups are important for small animals. They should be examined by a veterinarian at least once a year. Common health issues in small animals include dental problems, respiratory infections, and parasites.</p>
      
      <h2>Exercise</h2>
      <p>Exercise is crucial for the physical and mental well-being of small animals. They should have opportunities for regular exercise to prevent obesity and behavioral problems.</p>
      
      <h2>Conclusion</h2>
      <p>By understanding and meeting the basic needs of small animals, you can help ensure they live long, healthy, and happy lives. Remember that each species has its own specific requirements, so it's important to research and understand the particular needs of your small animal.</p>
    `,
    publishedAt: new Date().toISOString(),
    author: {
      name: 'Dr. Veterinary Expert',
      bio: 'Specialized in small animal medicine with over 15 years of experience.'
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
    content: `
      <p>Large animals are susceptible to a variety of diseases that can significantly impact their health and productivity. Early identification and treatment of these diseases is crucial for the well-being of the animals.</p>
      
      <h2>Respiratory Diseases</h2>
      <p>Respiratory diseases are common in large animals, particularly in cattle and horses. These include conditions such as pneumonia, bronchitis, and influenza. Symptoms may include coughing, nasal discharge, difficulty breathing, and fever.</p>
      
      <h2>Digestive Disorders</h2>
      <p>Digestive disorders can affect the health and productivity of large animals. These include conditions such as bloat, colic, and diarrhea. Symptoms may include abdominal pain, reduced appetite, and changes in fecal consistency.</p>
      
      <h2>Reproductive Diseases</h2>
      <p>Reproductive diseases can affect the fertility and reproductive performance of large animals. These include conditions such as brucellosis, leptospirosis, and bovine viral diarrhea. Symptoms may include abortion, stillbirth, and reduced fertility.</p>
      
      <h2>Metabolic Diseases</h2>
      <p>Metabolic diseases can affect the overall health and productivity of large animals. These include conditions such as milk fever, ketosis, and grass tetany. Symptoms may include weakness, tremors, and collapse.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding common diseases in large animals is essential for early identification and treatment. Regular health check-ups, proper nutrition, and good management practices can help prevent many of these diseases. If you suspect your animal is sick, consult a veterinarian immediately.</p>
    `,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Veterinary Specialist',
      bio: 'Expert in large animal medicine and preventive care.'
    },
    category: {
      name: 'Large Animals',
      slug: 'large-animals'
    }
  }
];

// More mock articles for related articles section
const relatedMockArticles = [
  {
    id: 3,
    title: 'Nutrition Guide for Small Animals',
    slug: 'nutrition-guide-for-small-animals',
    excerpt: 'Essential nutritional information to keep your small animals healthy and thriving.',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Animal Nutritionist'
    },
    category: {
      name: 'Small Animals',
      slug: 'small-animals'
    }
  },
  {
    id: 4,
    title: 'Preventive Care for Small Animals',
    slug: 'preventive-care-for-small-animals',
    excerpt: 'A guide to preventive care measures for small animals to avoid common health issues.',
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Preventive Care Specialist'
    },
    category: {
      name: 'Small Animals',
      slug: 'small-animals'
    }
  },
  {
    id: 5,
    title: 'Breeding Small Animals: Best Practices',
    slug: 'breeding-small-animals-best-practices',
    excerpt: 'Learn about the best practices for breeding small animals for health and genetic diversity.',
    publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    author: {
      name: 'Breeding Expert'
    },
    category: {
      name: 'Small Animals',
      slug: 'small-animals'
    }
  }
];

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Get article by slug
        const articleData = await articleApi.getBySlug(slug);
        setArticle(articleData);
        
        // Get related articles
        try {
          const relatedData = await articleApi.getRelated(articleData.id, 3);
          setRelatedArticles(relatedData);
        } catch (relatedErr) {
          console.error('Error fetching related articles:', relatedErr);
          // Fallback to mock related articles
          const mockRelated = relatedMockArticles.filter(
            a => a.category?.slug === articleData.category?.slug && a.id !== articleData.id
          );
          setRelatedArticles(mockRelated);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        
        // Fallback to mock data
        const foundArticle = mockArticles.find(a => a.slug === slug);
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Set related articles based on category
          const related = relatedMockArticles.filter(
            a => a.category?.slug === foundArticle.category?.slug && a.id !== foundArticle.id
          );
          setRelatedArticles(related);
        } else {
          setError('Article not found');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading article...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error || 'Article not found'}</p>
          </div>
          <Link 
            href="/articles"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Articles
          </Link>
        </div>
      </MainLayout>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          {article.category && (
            <Link 
              href={`/categories/${article.category.slug}`}
              className="text-sm font-semibold text-green-600 uppercase tracking-wider"
            >
              {article.category.name}
            </Link>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{article.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            {article.author && (
              <div className="flex items-center mr-6">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>{article.author.name}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.coverImage && (
            <div className="h-96 relative">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div 
              className="prose prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Author Bio */}
            {article.author && article.author.bio && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Author</h3>
                <p className="text-gray-600">{article.author.bio}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Comments Section */}
        <CommentSection articleId={article.id} />
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <ArticleGrid 
              title="Related Articles"
              articles={relatedArticles}
              columns={3}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}