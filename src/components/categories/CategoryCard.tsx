'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

// Icons for categories
const CategoryIcons: Record<string, ReactNode> = {
  'small-animals': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 2.5c.5-1.5 3.5-1.5 4 0 .5 1.5-.5 2-2 3-1.5-1-.5-1.5 0-3Z"/>
      <path d="M11.25 11.25c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25S13.19 10 12.5 10s-1.25.56-1.25 1.25Z"/>
      <path d="M20 16c-1.39-1.44-3.9-3-7.5-3-3.6 0-6.11 1.56-7.5 3"/>
      <path d="M4 16.5c-.5 0-1-.1-1.4-.4-.6-.4-.6-1 0-1.4C4.44 13.25 7.67 11 12.5 11c4.83 0 8.06 2.25 9.9 3.7.6.4.6 1 0 1.4-.4.3-.9.4-1.4.4"/>
      <path d="M20 22v-5.5c0-1.1-.9-2-2-2h-2.5"/>
      <path d="M13.75 14.5h-2.5c-1.1 0-2 .9-2 2V22"/>
      <path d="M20 22H4"/>
    </svg>
  ),
  'large-animals': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3s.9 2.6.9 3.7c0 1.1-.9 2-2 2H8.1c-1.1 0-2-.9-2-2C6.1 5.6 7 3 7 3"/>
      <path d="M9.5 3h5"/>
      <path d="M8 9v12"/>
      <path d="M16 9v12"/>
      <path d="M5.7 15.4c-.9.9-1.5 2-1.7 3.1-.1.7.1 1.3.6 1.8l.4.4c.7.7 1.9.7 2.6 0l2.8-2.8"/>
      <path d="M13.6 15.4c.9.9 1.5 2 1.7 3.1.1.7-.1 1.3-.6 1.8l-.4.4c-.7.7-1.9.7-2.6 0l-2.8-2.8"/>
      <path d="M8 16h8"/>
    </svg>
  ),
  'poultry': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 15c2.86.8 5.91 1.2 9 1.2s6.14-.4 9-1.2l-.5-9Z"/>
      <path d="M12 7v9"/>
      <path d="M8 10v3"/>
      <path d="M16 10v3"/>
      <path d="M12 16a2 2 0 0 0 1.856-1.258"/>
      <path d="M5 9.5 2 12"/>
      <path d="M19 9.5l3 2.5"/>
      <path d="M12 4c1.6.7 2.5 1.5 3 3"/>
      <path d="M9 7c.5-1.5 1.4-2.3 3-3"/>
    </svg>
  ),
  'pet-animals': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
      <path d="M8 14v.5"/>
      <path d="M16 14v.5"/>
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/>
    </svg>
  ),
  'zoo-animals': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 16c.9.8 2.4 1.3 4 1.3s3.1-.5 4-1.3"/>
      <path d="M9 10h.01"/>
      <path d="M15 10h.01"/>
      <path d="M9 7h6"/>
      <path d="M12 7v3"/>
      <path d="M6 20c.4-1.4 1.1-2.5 2-3.2"/>
      <path d="M18 20c-.4-1.4-1.1-2.5-2-3.2"/>
      <path d="M12 22v-3"/>
      <path d="M20 11c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 2.2.9 4.2 2.3 5.7"/>
      <path d="M17.7 16.7c1.4-1.5 2.3-3.5 2.3-5.7"/>
    </svg>
  ),
  'nutrition': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 12H3v9h9v-9z"/>
      <path d="M20.4 7.5 12 12v9l8.4-4.5V7.5z"/>
      <path d="M15.2 6.2 12 3l-9 4.8L11 12l4.2-5.8z"/>
    </svg>
  ),
  'diseases': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 19H5c-1.105 0-2-.895-2-2v-2c0-1.105.895-2 2-2h3v6Z"/>
      <path d="M16 19h3c1.105 0 2-.895 2-2v-2c0-1.105-.895-2-2-2h-3v6Z"/>
      <path d="M12 19V5"/>
      <path d="M8 5h8"/>
      <path d="M8 9h8"/>
      <path d="M8 13h8"/>
    </svg>
  ),
  'breeds': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
      <path d="m15.9 8.7-.4 2.1"/>
      <path d="m8.5 13.2.4-2.1"/>
      <path d="M13.9 13.8c-.2.7-1 1.2-1.9 1.2s-1.7-.5-1.9-1.2"/>
      <path d="M9.1 8.2c.2-.7 1-1.2 1.9-1.2s1.7.5 1.9 1.2"/>
      <path d="M12 8v2"/>
      <path d="M12 14v2"/>
      <path d="M9 11a2 2 0 0 0 3 0"/>
    </svg>
  ),
  'management': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4V2"/>
      <path d="M5 10H3"/>
      <path d="m7.5 5.5-1.5-1.5"/>
      <path d="M5 14H3"/>
      <path d="M19 10h2"/>
      <path d="m16.5 5.5 1.5-1.5"/>
      <path d="M19 14h2"/>
      <path d="M12 22v-2"/>
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
    </svg>
  ),
};

// Default icon for categories without a specific icon
const DefaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

interface CategoryCardProps {
  category: Category;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  className = '',
  variant = 'default'
}) => {
  const getIcon = () => {
    // Always use SVG icons for now since we don't have the actual images
    const iconComponent = CategoryIcons[category.slug] || DefaultIcon;
    
    return (
      <div className={`${variant === 'featured' ? 'text-white' : 'text-green-600'}`}>
        {iconComponent}
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <Link 
        href={`/categories/${category.slug}`}
        className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          {getIcon()}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`relative h-64 rounded-lg overflow-hidden shadow-md group ${className}`}>
        <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full flex items-center justify-center bg-green-800/20">
            {getIcon()}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
            {category.description && (
              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                {category.description}
              </p>
            )}
            <Link 
              href={`/categories/${category.slug}`} 
              className="inline-block text-sm text-white hover:text-green-200"
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="h-40 bg-gray-50 flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
        {category.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;