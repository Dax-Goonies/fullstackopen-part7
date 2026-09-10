const baseUrl = '/api/blogs'

// POST: New comment
const create = async (blogId, comment) => {
  const response = await fetch(`${baseUrl}/${blogId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  })
  if (!response.ok) {
    throw new Error('Failed to add comments')
  }
  return await response.json()
}

export default { create }
