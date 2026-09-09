import { useUsers } from '../hooks/useUsers'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import User from './User'

const UsersList = ({ user, blogs }) => {
  const { users, isPending, isError } = useUsers()

  if (isPending) return <div>loading users...</div>
  if (isError) return <div>users service not available</div>

  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList
