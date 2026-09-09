import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@mui/material'

// Blog component to display individual blog information
const User = ({ user }) => (
  <TableRow>
    <TableCell>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </TableCell>
    <TableCell>{user.username}</TableCell>
    <TableCell>{user.blogs.length}</TableCell>
  </TableRow>
)

export default User
