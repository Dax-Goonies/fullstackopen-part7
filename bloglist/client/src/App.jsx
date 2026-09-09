import { useState, useEffect } from 'react'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import blogService from './services/blogs'
import loginService from './services/login'
import { getUser, saveUser, removeUser } from './services/persistentUser'
import NotFound from './components/NotFound'
import { useNotify } from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'
import { useBlogs } from './hooks/useBlogs'

const App = () => {
  const { blogs, isPending, isError, createBlog, vote, removeBlog } = useBlogs()
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const notify = useNotify()

  // Save user token locally
  useEffect(() => {
    const user = getUser()
    if (user) {
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  // Handle login form submission
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      saveUser(user)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
      notify('logged in successfully', 'success')
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  // Handle logout
  const handleLogout = () => {
    removeUser()
    userDispatch({ type: 'CLEAR' })
    notify('logged out successfully', 'success')
    navigate('/')
  }

  // POST: Handle creating new blog
  const handleCreate = async (blogObject) => {
    await createBlog(blogObject)
    navigate('/')
  }

  // PUT: Handle liking blog
  const handleLike = (blog) => {
    vote(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
  }

  // DELETE: Handle removing blog
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog.id)
      navigate('/')
    }
  }

  // Styling the navigation bar
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color="inherit" component={Link} to="/" sx={style}>
              blogs
            </Button>{' '}
            <Button color="inherit" component={Link} to="/users" sx={style}>
              users
            </Button>
            {user && (
              <Button
                color="inherit"
                component={Link}
                to="/blogs/new"
                sx={style}
              >
                new blog
              </Button>
            )}
            {user ? (
              <Button color="inherit" onClick={handleLogout} sx={style}>
                logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Notification />

        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <h2>Log in to application</h2>
                <LoginForm handleLogin={handleLogin} />
              </div>
            }
          />
          <Route path="/" element={<BlogList user={user} blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={blogs}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            }
          />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route
            path="/blogs/new"
            element={<BlogForm createBlog={handleCreate} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
