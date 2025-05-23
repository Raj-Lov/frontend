'use client';

import React from 'react';
import CategoryCard from './CategoryCard';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

interface CategoryGridProps {
  categories: Category[];
  title?: string;
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  title, 
  className = '' 
}) => {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;