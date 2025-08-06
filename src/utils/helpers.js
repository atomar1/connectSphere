export const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }
  
  export const validatePostForm = (formData) => {
    const errors = {}
    
    if (!formData.title?.trim()) {
      errors.title = 'Title is required'
    }
    
    if (!formData.secret_key?.trim()) {
      errors.secret_key = 'Secret key is required'
    }
    
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      errors.image_url = 'Please enter a valid URL'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }