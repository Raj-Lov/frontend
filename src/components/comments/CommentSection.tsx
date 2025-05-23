'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { commentsApi } from '@/lib/api';

interface Comment {
  id: number;
  content: string;
  article_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
  user: {
    id: number;
    full_name: string;
    avatar: string | null;
  };
}

interface CommentSectionProps {
  articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = auth.isAuthenticated();
  const currentUser = auth.getUser();

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await commentsApi.getForArticle(articleId);
      setComments(response);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = auth.getToken();
      if (!token) return;

      const response = await commentsApi.create(
        articleId,
        newComment.trim(),
        replyTo,
        token
      );

      // Add the new comment to the list
      setComments((prev) => [response, ...prev]);
      setNewComment('');
      setReplyTo(null);
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = auth.getToken();
      if (!token) return;

      const response = await commentsApi.update(
        commentId,
        editContent.trim(),
        token
      );

      // Update the comment in the list
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? response : c))
      );
      setEditingComment(null);
      setEditContent('');
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Failed to update comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Are you sure you want to delete this comment?') || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = auth.getToken();
      if (!token) return;

      await commentsApi.delete(commentId, token);

      // Remove the comment from the list
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const startReplying = (commentId: number) => {
    setReplyTo(commentId);
  };

  const cancelReplying = () => {
    setReplyTo(null);
  };

  // Group comments by parent_id
  const parentComments = comments.filter((c) => c.parent_id === null);
  const childComments = comments.filter((c) => c.parent_id !== null);

  const getChildComments = (parentId: number) => {
    return childComments.filter((c) => c.parent_id === parentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          {replyTo && (
            <div className="mb-2 flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-600">
                Replying to a comment
              </span>
              <button
                type="button"
                onClick={cancelReplying}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            rows={4}
            required
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-2">
            Please{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700">
              log in
            </Link>{' '}
            to post a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading comments...</p>
        </div>
      ) : parentComments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {parentComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
              {/* Parent Comment */}
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    {comment.user.avatar ? (
                      <Image
                        src={comment.user.avatar}
                        alt={comment.user.full_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                          {comment.user.full_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href={`/users/${comment.user_id}`}
                        className="font-medium text-gray-900 hover:text-green-600"
                      >
                        {comment.user.full_name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.created_at)}
                        {comment.updated_at !== comment.created_at && ' (edited)'}
                      </p>
                    </div>
                    {currentUser && (currentUser.id === comment.user_id || currentUser.role === 'admin') && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(comment)}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingComment === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        rows={3}
                        required
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={cancelEditing}
                          className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          disabled={isSubmitting}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                        >
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-gray-700">{comment.content}</div>
                  )}
                  
                  {isAuthenticated && editingComment !== comment.id && (
                    <button
                      onClick={() => startReplying(comment.id)}
                      className="mt-2 text-green-600 hover:text-green-700 text-sm"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>

              {/* Reply Form */}
              {replyTo === comment.id && (
                <div className="mt-4 ml-14">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    required
                  />
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={cancelReplying}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitComment}
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Reply'}
                    </button>
                  </div>
                </div>
              )}

              {/* Child Comments */}
              {getChildComments(comment.id).length > 0 && (
                <div className="mt-4 ml-14 space-y-4">
                  {getChildComments(comment.id).map((childComment) => (
                    <div key={childComment.id} className="border-l-2 border-gray-100 pl-4">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            {childComment.user.avatar ? (
                              <Image
                                src={childComment.user.avatar}
                                alt={childComment.user.full_name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-gray-600">
                                  {childComment.user.full_name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div>
                              <Link
                                href={`/users/${childComment.user_id}`}
                                className="font-medium text-gray-900 hover:text-green-600"
                              >
                                {childComment.user.full_name}
                              </Link>
                              <p className="text-xs text-gray-500">
                                {formatDate(childComment.created_at)}
                                {childComment.updated_at !== childComment.created_at && ' (edited)'}
                              </p>
                            </div>
                            {currentUser && (currentUser.id === childComment.user_id || currentUser.role === 'admin') && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEditing(childComment)}
                                  className="text-gray-500 hover:text-gray-700 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(childComment.id)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {editingComment === childComment.id ? (
                            <div className="mt-2">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                rows={3}
                                required
                              />
                              <div className="mt-2 flex justify-end space-x-2">
                                <button
                                  onClick={cancelEditing}
                                  className="text-gray-500 hover:text-gray-700 text-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleEditComment(childComment.id)}
                                  disabled={isSubmitting}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                                >
                                  {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-1 text-gray-700">{childComment.content}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}