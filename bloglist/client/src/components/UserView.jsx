import { useParams } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'

// Single user detail component
const UserView = () => {
  const { id } = useParams()
  const { users, isPending, isError } = useUsers()

  if (isPending) return <div>loading user...</div>
  if (isError) return <div>users service not available</div>

  const user = users.find((u) => u.id === id)

  if (!user) return <div>user not found</div>
  if (user.blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>no blog added yet</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
