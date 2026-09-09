import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

// Blogs custom hook
export const useBlogs = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  // POST: New blog
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    },
    onError: () => {
      notify('failed to create blog', 'error')
    }
  })

  // PUT: Vote
  const voteMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify(`you liked '${updatedBlog.title}'`)
    },
    onError: () => {
      notify('failed to update likes', 'error')
    }
  })

  // DELETE: Remove blog
  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify('blog removed')
    },
    onError: () => {
      notify('failed to remove blog', 'error')
    }
  })

  // Export
  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    createBlog: (blogObject) => newBlogMutation.mutateAsync(blogObject),
    vote: (id, blog) => voteMutation.mutate({ id, blog }),
    removeBlog: (id) => removeMutation.mutateAsync(id)
  }
}
