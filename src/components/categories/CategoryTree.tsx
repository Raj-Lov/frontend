'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Category {
  id: number;
  name: string;
  slug: string;
  children: Category[];
  level: number;
}

interface CategoryTreeProps {
  categories: Category[];
  className?: string;
}

const CategoryTreeItem: React.FC<{ category: Category; level: number }> = ({ category, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  
  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <li className="py-1">
      <div className="flex items-center">
        <div style={{ width: `${level * 20}px` }} className="flex-shrink-0"></div>
        
        {hasChildren ? (
          <button 
            onClick={toggleOpen}
            className="mr-1 p-1 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            {isOpen ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-6"></div>
        )}
        
        <Link 
          href={`/categories/${category.slug}`}
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          {category.name}
        </Link>
      </div>
      
      {hasChildren && isOpen && (
        <ul className="mt-1">
          {category.children.map((child) => (
            <CategoryTreeItem key={child.id} category={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <ul className="space-y-1">
        {categories.map((category) => (
          <CategoryTreeItem key={category.id} category={category} level={0} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryTree;