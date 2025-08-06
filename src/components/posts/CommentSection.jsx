import React, { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { useComments } from '../../hooks/useComments'
import { formatTimeAgo } from '../../utils/helpers'

const CommentSection = ({ postId }) => {
  const { comments, loading, addComment } = useComments(postId)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || submitting) return

    try {
      setSubmitting(true)
      await addComment(newComment)
      setNewComment('')
    } catch (error) {
      alert('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading comments...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <MessageSquare className="w-5 h-5" />
        <span>Comments ({comments.length})</span>
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Adding...' : 'Add Comment'}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-4 border-blue-100 pl-4">
            <p className="text-gray-700 mb-2">{comment.content}</p>
            <p className="text-sm text-gray-500">{formatTimeAgo(comment.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection