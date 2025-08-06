// src/pages/CreatePostPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postsApi } from '../services/api'
import { validatePostForm } from '../utils/helpers'
import { COMMUNITIES } from '../utils/constants'

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    community: COMMUNITIES[0],
    location: '',
    secret_key: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validation = validatePostForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setSubmitting(true)
    try {
      const newPost = await postsApi.create(formData)
      navigate(`/post/${newPost.id}`)
    } catch (error) {
      alert('Failed to create post. Please try again.')
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className={`w-full px-3 py-2 border rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.image_url ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secret Key *
            </label>
            <input
              type="password"
              name="secret_key"
              value={formData.secret_key}
              onChange={handleChange}
              placeholder="Choose a secret key to edit/delete this post later"
              className={`w-full px-3 py-2 border text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.secret_key ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.secret_key && <p className="mt-1 text-sm text-red-600">{errors.secret_key}</p>}
            <p className="mt-1 text-sm text-gray-500">
              Remember this key - you'll need it to edit or delete your post
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
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
            {submitting ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePostPage