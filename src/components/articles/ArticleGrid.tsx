'use client';

import React from 'react';
import ArticleCard from './ArticleCard';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  category?: {
    name: string;
    slug: string;
  };
}

interface ArticleGridProps {
  articles: Article[];
  title?: string;
  viewAllLink?: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'featured';
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ 
  articles, 
  title, 
  viewAllLink,
  className = '',
  columns = 3,
  variant = 'default'
}) => {
  const getColumnsClass = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={className}>
      {(title || viewAllLink) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
          {viewAllLink && (
            <Link 
              href={viewAllLink} 
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View all →
            </Link>
          )}
        </div>
      )}
      
      {articles.length > 0 ? (
        <div className={`grid ${getColumnsClass()} gap-6`}>
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant={variant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;