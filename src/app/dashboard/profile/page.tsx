'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import { User } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    bio: '',
    avatar: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Check if user is authenticated and load profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      const currentUser = auth.getUser();
      if (!currentUser) {
        router.push('/login?redirect=/dashboard/profile');
        return;
      }

      try {
        // In a real app, you might want to fetch the latest user data from the API
        // For now, we'll use the data from auth
        setUser(currentUser);
        setFormData({
          full_name: currentUser.full_name || '',
          email: currentUser.email || '',
          bio: currentUser.bio || '',
          avatar: currentUser.avatar || '',
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    // Validate form
    if (!formData.full_name || !formData.email) {
      setError('Name and email are required');
      setIsSaving(false);
      return;
    }

    // Validate password if changing
    if (formData.new_password) {
      if (!formData.current_password) {
        setError('Current password is required to set a new password');
        setIsSaving(false);
        return;
      }
      
      if (formData.new_password !== formData.confirm_password) {
        setError('New passwords do not match');
        setIsSaving(false);
        return;
      }
      
      if (formData.new_password.length < 8) {
        setError('New password must be at least 8 characters');
        setIsSaving(false);
        return;
      }
    }

    try {
      // Prepare update data
      const updateData = {
        full_name: formData.full_name,
        email: formData.email,
        bio: formData.bio,
        avatar: formData.avatar
      };

      // In a real app, you would call the API to update the profile
      // For now, we'll simulate a successful update
      // const updatedUser = await api.updateUserProfile(user.id, updateData);
      
      // If changing password
      if (formData.new_password) {
        // await api.changePassword(user.id, formData.current_password, formData.new_password);
      }

      // Update local user data
      const updatedUser = {
        ...user,
        ...updateData
      };
      
      setUser(updatedUser);
      auth.updateUser(updatedUser);
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-gray-700 mb-4">You must be logged in to view this page</p>
                <button
                  onClick={() => router.push('/login?redirect=/dashboard/profile')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-green-600 px-6 py-4">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
              </div>

              {/* Alerts */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Content */}
              <div className="p-6">
                {isEditing ? (
                  // Edit Profile Form
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left Column - Basic Info */}
                      <div className="flex-1 space-y-6">
                        <div>
                          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Brief description for your profile
                          </p>
                        </div>
                      </div>

                      {/* Right Column - Avatar and Password */}
                      <div className="flex-1 space-y-6">
                        <div>
                          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Avatar URL
                          </label>
                          <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            URL to your profile picture
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Leave blank if you don't want to change your password
                          </p>

                          <div className="mt-4">
                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="current_password"
                              name="current_password"
                              value={formData.current_password}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                          </div>

                          <div className="mt-4">
                            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="new_password"
                              name="new_password"
                              value={formData.new_password}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                          </div>

                          <div className="mt-4">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirm_password"
                              name="confirm_password"
                              value={formData.confirm_password}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Profile View
                  <div>
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left Column - Avatar and Basic Info */}
                      <div className="flex-1">
                        <div className="flex flex-col items-center md:items-start">
                          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={user.full_name}
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-green-100 flex items-center justify-center">
                                <span className="text-4xl font-medium text-green-800">
                                  {user.full_name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h2 className="text-xl font-bold">{user.full_name}</h2>
                          <p className="text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500 mt-1 capitalize">Role: {user.role}</p>
                          <p className="text-sm text-gray-500">
                            Member since: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Right Column - Bio and Stats */}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Bio</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {user.bio || 'No bio provided yet.'}
                        </p>

                        <div className="mt-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Stats</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Articles</p>
                              <p className="text-2xl font-bold text-green-600">12</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-500">Comments</p>
                              <p className="text-2xl font-bold text-green-600">48</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}