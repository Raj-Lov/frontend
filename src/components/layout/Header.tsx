'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { auth } from '@/lib/auth';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check authentication status on component mount and when auth changes
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = auth.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        setUser(auth.getUser());
      } else {
        setUser(null);
      }
    };
    
    // Check auth on mount
    checkAuth();
    
    // Set up event listener for storage changes (for when user logs out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Navigate to search page with query
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-600">Vetnol</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link href="/articles" className="text-gray-700 hover:text-green-600">
            Articles
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-green-600">
            Categories
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </nav>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center ml-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-40 lg:w-64 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center mr-4">
                {user?.avatar ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <Image 
                      src={user.avatar} 
                      alt={user.full_name} 
                      width={32} 
                      height={32} 
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-green-800 font-medium">
                      {user?.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="text-gray-700 hidden lg:inline">{user?.full_name}</span>
              </div>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600 mr-4">
                Dashboard
              </Link>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  auth.logout();
                  setIsLoggedIn(false);
                  setUser(null);
                  router.push('/');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-green-600"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4 pt-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-green-600">
              Articles
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-green-600">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>
            
            {/* Auth Links for Mobile */}
            <div className="pt-3 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  {user && (
                    <div className="flex items-center mb-3">
                      {user.avatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image 
                            src={user.avatar} 
                            alt={user.full_name} 
                            width={32} 
                            height={32} 
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-green-800 font-medium">
                            {user.full_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-gray-700">{user.full_name}</span>
                    </div>
                  )}
                  <Link href="/dashboard" className="block text-gray-700 hover:text-green-600 mb-3">
                    Dashboard
                  </Link>
                  <button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      auth.logout();
                      setIsLoggedIn(false);
                      setUser(null);
                      router.push('/');
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block text-gray-700 hover:text-green-600 mb-3"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}