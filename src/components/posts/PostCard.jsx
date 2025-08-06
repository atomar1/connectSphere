import React from 'react'
import { Clock, ArrowUp, MapPin } from 'lucide-react'
import { formatTimeAgo } from '../../utils/helpers'

const PostCard = ({ post, onClick }) => {
  return (
    <div
      onClick={() => onClick(post.id)}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          {post.content && (
            <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUp className="w-4 h-4" />
              <span>{post.upvotes}</span>
            </div>
            {post.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{post.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {post.image_url && (
          <img
            src={post.image_url}
            alt=""
            className="w-20 h-20 rounded-lg object-cover ml-4"
          />
        )}
      </div>
    </div>
  )
}

export default PostCard