"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, ThumbsUp, Heart, Laugh, Angry, Frown, Zap } from 'lucide-react';

const reactionEmojis = {
  like: { icon: <ThumbsUp className="w-4 h-4" />, label: 'Like' },
  love: { icon: <Heart className="w-4 h-4" />, label: 'Love' },
  laugh: { icon: <Laugh className="w-4 h-4" />, label: 'Laugh' },
  angry: { icon: <Angry className="w-4 h-4" />, label: 'Angry' },
  sad: { icon: <Frown className="w-4 h-4" />, label: 'Sad' },
  wow: { icon: <Zap className="w-4 h-4" />, label: 'Wow' }
};

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });

  // Generate user identifier (you can improve this with proper user management)
  const userIdentifier = typeof window !== 'undefined' ? 
    localStorage.getItem('userIdentifier') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : 
    'anonymous';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userIdentifier', userIdentifier);
    }
    fetchComments();
    fetchReactions();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReactions = async () => {
    try {
      const response = await fetch(`/api/reactions?postId=${postId}`);
      const data = await response.json();
      if (data.success) {
        setReactions(data.data);
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const handleReaction = async (reactionType) => {
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          reactionType,
          userIdentifier
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchReactions(); // Refresh reactions
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.authorName || !newComment.authorEmail || !newComment.content) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          ...newComment
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setNewComment({ authorName: '', authorEmail: '', content: '' });
        fetchComments(); // Refresh comments
      } else {
        alert(data.error || 'Error submitting comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Reactions Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-gray-600">React to this article:</span>
            {Object.entries(reactionEmojis).map(([type, { icon, label }]) => (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                title={label}
              >
                {icon}
                <Badge variant="secondary" className="text-xs">
                  {reactions[type] || 0}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  value={newComment.authorName}
                  onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={newComment.authorEmail}
                  onChange={(e) => setNewComment({...newComment, authorEmail: e.target.value})}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment *</label>
              <Textarea
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.authorName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

