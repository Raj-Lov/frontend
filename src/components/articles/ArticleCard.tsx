'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

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

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'default',
  className = '' 
}) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (variant === 'compact') {
    return (
      <div className={`flex items-start space-x-4 ${className}`}>
        <div className="flex-shrink-0">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              width={80}
              height={60}
              className="rounded object-cover"
              style={{ width: '80px', height: '60px' }}
            />
          ) : (
            <div className="bg-gray-200 rounded w-20 h-[60px] flex items-center justify-center">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            <Link href={`/articles/${article.slug}`} className="hover:text-green-600">
              {article.title}
            </Link>
          </h3>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`relative h-96 rounded-lg overflow-hidden group ${className}`}>
        <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          {article.category && (
            <Link 
              href={`/categories/${article.category.slug}`}
              className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2"
            >
              {article.category.name}
            </Link>
          )}
          <h2 className="text-2xl font-bold text-white mb-2">
            <Link href={`/articles/${article.slug}`} className="hover:text-green-200">
              {article.title}
            </Link>
          </h2>
          <p className="text-white/80 mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center text-white/70 text-sm">
            {article.author && (
              <>
                <UserIcon className="h-4 w-4 mr-1" />
                <span className="mr-3">{article.author.name}</span>
              </>
            )}
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <div className="h-48 bg-gray-200 relative">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {article.category && (
          <Link 
            href={`/categories/${article.category.slug}`}
            className="text-xs font-semibold text-green-600 uppercase tracking-wider"
          >
            {article.category.name}
          </Link>
        )}
        <h3 className="font-semibold text-gray-800 mt-1 mb-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-green-600">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center text-gray-500 text-xs">
          {article.author && (
            <>
              <UserIcon className="h-3 w-3 mr-1" />
              <span className="mr-3">{article.author.name}</span>
            </>
          )}
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;