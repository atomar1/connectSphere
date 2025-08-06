// src/pages/EditPostPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePost } from '../hooks/usePosts'
import { postsApi } from '../services/api'
import { validatePostForm } from '../utils/helpers'
import { COMMUNITIES } from '../utils/constants'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const EditPostPage = () => {
  const { id } = useParams()
  const { post, loading, error } = usePost(id)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    community: COMMUNITIES[0],
    location: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        image_url: post.image_url || '',
        community: post.community || COMMUNITIES[0],
        location: post.location || ''
      })
    }
  }, [post])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form (excluding secret_key for edit)
    const validation = validatePostForm({ ...formData, secret_key: 'dummy' })
    if (!validation.isValid) {
      const { secret_key, ...editErrors } = validation.errors
      setErrors(editErrors)
      return
    }

    setSubmitting(true)
    try {
      await postsApi.update(id, formData)
      navigate(`/post/${id}`)
    } catch (error) {
      alert('Failed to update post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (loading) return <LoadingSpinner text="Loading post..." />
  if (error) return <div className="max-w-2xl mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>
  if (!post) return <div className="max-w-2xl mx-auto px-4 py-8 text-center text-gray-500">Post not found</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="What's your post about?"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Community
            </label>
            <select
              name="community"
              value={formData.community}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {COMMUNITIES.map((community) => (
                <option key={community} value={community}>{community}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Fullerton, CA (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Add a location to make this visible in local groups
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us more about your post..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg (optional)"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.image_url ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
            {formData.image_url && (
              <div className="mt-2">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="max-w-xs rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            disabled={submitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPostPage