import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

// Custom hook: useUsers
export const useUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  })

  // Export
  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError
  }
}
