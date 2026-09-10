const baseUrl = '/api/users'

// Fetch all the users for UserView
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return await response.json()
}

export default { getAll }
