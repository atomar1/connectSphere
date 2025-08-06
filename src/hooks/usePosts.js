import { useState, useEffect } from 'react'
import { postsApi } from '../services/api'

export const usePosts = (sortBy = 'newest') => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postsApi.getAll(sortBy)
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [sortBy])

  const upvotePost = async (postId, currentUpvotes) => {
    try {
      const updatedPost = await postsApi.upvote(postId, currentUpvotes)
      setPosts(posts.map(post => 
        post.id === postId ? updatedPost : post
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    upvotePost
  }
}

export const usePost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await postsApi.getById(id)
        setPost(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const updatePost = (updatedData) => {
    setPost(prev => ({ ...prev, ...updatedData }))
  }

  return {
    post,
    loading,
    error,
    updatePost
  }
}