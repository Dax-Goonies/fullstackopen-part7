const USER_KEY = 'loggegBlogappUser'

// Create new user
export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(USER_KEY)
  if (!loggedUserJSON) {
    return null
  }
  try {
    return JSON.parse(loggedUserJSON)
  } catch {
    return null
  }
}

// Login
export const saveUser = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Logout
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
