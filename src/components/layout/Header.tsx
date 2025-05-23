'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be replaced with actual auth state

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-600">Vetnol</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link href="/articles" className="text-gray-700 hover:text-green-600">
            Articles
          </Link>
          <Link href="/case-studies" className="text-gray-700 hover:text-green-600">
            Case Studies
          </Link>
          <Link href="/research" className="text-gray-700 hover:text-green-600">
            Research
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                Dashboard
              </Link>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="text-gray-700 hover:text-green-600"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
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
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-green-600">
              Articles
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-green-600">
              Case Studies
            </Link>
            <Link href="/research" className="text-gray-700 hover:text-green-600">
              Research
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
                  <Link href="/dashboard" className="block text-gray-700 hover:text-green-600 mb-3">
                    Dashboard
                  </Link>
                  <button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="block text-gray-700 hover:text-green-600 mb-3"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/auth/register" 
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