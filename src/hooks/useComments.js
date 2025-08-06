import { useState, useEffect } from 'react'
import { commentsApi } from '../services/api'

export const useComments = (postId) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    try {
      setLoading(true)
      const data = await commentsApi.getByPostId(postId)
      setComments(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (postId) {
      fetchComments()
    }
  }, [postId])

  const addComment = async (content) => {
    try {
      const newComment = await commentsApi.create({
        content,
        post_id: parseInt(postId)
      })
      setComments([...comments, newComment])
      return newComment
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    comments,
    loading,
    error,
    addComment,
    refetch: fetchComments
  }
}