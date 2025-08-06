import { supabase } from '../utils/supabaseClient'

// Posts API
export const postsApi = {
  // Get all posts with optional sorting
  getAll: async (sortBy = 'newest') => {
    const orderColumn = sortBy === 'newest' ? 'created_at' : 'upvotes'
    const ascending = false
    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(orderColumn, { ascending })
    
    if (error) throw error
    return data
  },

  // Get single post by ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new post
  create: async (postData) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        ...postData,
        upvotes: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update post
  update: async (id, postData) => {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete post
  delete: async (id) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Upvote post
  upvote: async (id, currentUpvotes) => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Verify secret key
  verifySecretKey: async (id, secretKey) => {
    const { data, error } = await supabase
      .from('posts')
      .select('secret_key')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data.secret_key === secretKey
  }
}

// Comments API
export const commentsApi = {
  // Get comments for a post
  getByPostId: async (postId) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Create new comment
  create: async (commentData) => {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        ...commentData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}