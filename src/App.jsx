import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import FeedPage from './pages/FeedPage'
import PostDetailPage from './pages/PostDetailPage'
import CreatePostPage from './pages/CreatePostPage'
import EditPostPage from './pages/EditPostPage'
import { ROUTES } from './utils/constants'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<FeedPage />} />
          <Route path={ROUTES.COMMUNITY} element={<FeedPage />} />
          <Route path={ROUTES.POST_DETAIL} element={<PostDetailPage />} />
          <Route path={ROUTES.CREATE_POST} element={<CreatePostPage />} />
          <Route path={ROUTES.EDIT_POST} element={<EditPostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App