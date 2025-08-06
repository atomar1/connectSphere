// src/components/posts/PostDetail.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ArrowUp, MapPin, Edit, Trash2 } from 'lucide-react'
import { formatTimeAgo } from '../../utils/helpers'
import { postsApi } from '../../services/api'

const PostDetail = ({ post, onUpvote, onUpdate }) => {
  const [upvoting, setUpvoting] = useState(false)
  const navigate = useNavigate()

  const handleUpvote = async () => {
    if (!post || upvoting) return
    
    setUpvoting(true)
    try {
      await onUpvote(post.id, post.upvotes)
    } catch (error) {
      alert('Failed to upvote post')
    } finally {
      setUpvoting(false)
    }
  }

  const handleDelete = async () => {
    const secretKey = window.prompt('Enter the secret key to delete this post:')
    if (!secretKey) return
    
    try {
      const isValid = await postsApi.verifySecretKey(post.id, secretKey)
      if (isValid) {
        await postsApi.delete(post.id)
        navigate('/')
      } else {
        alert('Incorrect secret key')
      }
    } catch (error) {
      alert('Failed to delete post')
    }
  }

  const handleEdit = async () => {
    const secretKey = window.prompt('Enter the secret key to edit this post:')
    if (!secretKey) return
    
    try {
      const isValid = await postsApi.verifySecretKey(post.id, secretKey)
      if (isValid) {
        navigate(`/edit/${post.id}`)
      } else {
        alert('Incorrect secret key')
      }
    } catch (error) {
      alert('Failed to verify secret key')
    }
  }

  if (!post) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(post.created_at)}</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
              {post.community}
            </span>
            {post.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{post.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit post"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {post.image_url && (
        <img
          src={post.image_url}
          alt=""
          className="w-full max-w-2xl rounded-lg mb-4"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      )}

      {post.content && (
        <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={handleUpvote}
          disabled={upvoting}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          <ArrowUp className="w-4 h-4" />
          <span>{post.upvotes}</span>
        </button>
      </div>
    </div>
  )
}

export default PostDetail