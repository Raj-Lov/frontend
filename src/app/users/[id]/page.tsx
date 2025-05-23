'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ArticleGrid from '@/components/articles/ArticleGrid';
import { User } from '@/lib/auth';
import { articleApi } from '@/lib/api';

// Mock function to get user by ID (replace with actual API call)
const getUserById = async (id: string): Promise<User> => {
  // This would be an API call in a real implementation
  const mockUsers = [
    {
      id: 1,
      email: "admin@example.com",
      full_name: "Admin User",
      role: "admin",
      bio: "Administrator of the Vetnol platform with expertise in veterinary medicine.",
      avatar: "/images/users/admin.jpg",
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      email: "author@example.com",
      full_name: "Author User",
      role: "author",
      bio: "Veterinary content creator with 10+ years of experience in animal health.",
      avatar: "/images/users/author.jpg",
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      email: "user@example.com",
      full_name: "Regular User",
      role: "user",
      bio: "Veterinary student passionate about animal welfare and health.",
      avatar: "/images/users/user.jpg",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  const user = mockUsers.find(u => u.id === parseInt(id));
  if (!user) {
    throw new Error("User not found");
  }
  
  return user;
};

// Mock function to get user articles (replace with actual API call)
const getUserArticles = async (userId: string): Promise<any[]> => {
  // This would be an API call in a real implementation
  try {
    // Get all articles and filter by author ID
    const articles = await articleApi.getAll();
    return articles.filter(article => article.author?.id === parseInt(userId));
  } catch (err) {
    console.error('Error fetching user articles:', err);
    return [];
  }
};

export default function UserProfilePage() {
  const params = useParams();
  const userId = params?.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [userArticles, setUserArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        // Get user profile
        const userData = await getUserById(userId);
        setUser(userData);
        
        // Get user articles
        const articles = await getUserArticles(userId);
        setUserArticles(articles);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('User not found or error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <p className="text-red-700">{error || 'User not found'}</p>
          </div>
          <div className="text-center mt-6">
            <Link href="/" className="text-green-600 hover:text-green-700">
              Return to Home
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white mb-4 md:mb-0 md:mr-6">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-3xl text-gray-600">
                      {user.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{user.full_name}</h1>
                <p className="text-green-100">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p className="text-sm mt-2">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
              <p className="text-gray-600">
                {user.bio || 'No bio provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* User Articles */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles by {user.full_name}</h2>
          
          {userArticles.length > 0 ? (
            <ArticleGrid articles={userArticles} />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No articles found for this user.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}