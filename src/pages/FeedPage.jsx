import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, Users } from 'lucide-react'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/posts/PostCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { SORT_OPTIONS } from '../utils/constants'

const FeedPage = () => {
  const { community } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST)
  const [showLocalOnly, setShowLocalOnly] = useState(false)
  
  const { posts, loading, error } = usePosts(sortBy)

  const filteredPosts = posts.filter(post => {
    // Filter by community
    if (community && post.community.toLowerCase() !== community.toLowerCase()) {
      return false
    }

    // Filter by search term
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Filter by local only
    if (showLocalOnly && !post.location) {
      return false
    }

    return true
  })

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {community ? `${community} Community` : 'All Communities'}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={SORT_OPTIONS.NEWEST}>Newest</option>
              <option value={SORT_OPTIONS.POPULAR}>Most Upvoted</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showLocalOnly}
              onChange={(e) => setShowLocalOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show only local groups</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No posts found. Be the first to create one!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))
        )}
      </div>
    </div>
  )
}

export default FeedPage