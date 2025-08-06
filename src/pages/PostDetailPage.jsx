// src/pages/PostDetailPage.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { usePost } from '../hooks/usePosts'
import { postsApi } from '../services/api'
import PostDetail from '../components/posts/PostDetail'
import CommentSection from '../components/posts/CommentSection'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const PostDetailPage = () => {
  const { id } = useParams()
  const { post, loading, error, updatePost } = usePost(id)

  const handleUpvote = async (postId, currentUpvotes) => {
    try {
      const updatedPost = await postsApi.upvote(postId, currentUpvotes)
      updatePost(updatedPost)
    } catch (error) {
      throw new Error('Failed to upvote post')
    }
  }

  if (loading) return <LoadingSpinner text="Loading post..." />
  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center text-red-600">
        <p>Error loading post: {error}</p>
      </div>
    </div>
  )
  if (!post) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center text-gray-500">
        <p>Post not found</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <PostDetail 
          post={post} 
          onUpvote={handleUpvote}
          onUpdate={updatePost}
        />
        <CommentSection postId={id} />
      </div>
    </div>
  )
}

export default PostDetailPage