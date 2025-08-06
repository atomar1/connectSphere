import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Plus } from 'lucide-react'
import { COMMUNITIES } from '../../utils/constants'

const Header = () => {
  const location = useLocation()
  
  const getCurrentCommunity = () => {
    const path = location.pathname
    if (path === '/') return null
    
    const pathSegments = path.split('/')
    const communityFromPath = pathSegments[1]
    
    return COMMUNITIES.find(c => c.toLowerCase() === communityFromPath?.toLowerCase()) || null
  }

  const selectedCommunity = getCurrentCommunity()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ConnectSphere</span>
          </Link>
          
          <nav className="flex space-x-8">
            {COMMUNITIES.map((community) => (
              <Link
                key={community}
                to={`/${community.toLowerCase()}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCommunity === community
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {community}
              </Link>
            ))}
          </nav>
          
          <Link
            to="/new"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header