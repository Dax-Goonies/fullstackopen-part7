import axios from 'axios'
const baseUrl = '/api/blogs'

// Token
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// GET: Fetch all  blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// POST: New blog
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// PUT: Update blog: vote
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// DELETE: Remove blog
const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }
