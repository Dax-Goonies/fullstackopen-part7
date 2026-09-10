import { useParams } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { Typography } from '@mui/material'
import {
  StyledView,
  Row,
  ButtomRow,
  StyledLike,
  StyledRemove,
  StyledAddComment,
  StyledCommentInput
} from '../styles'

// Single blog detail component
const BlogView = ({ blogs, handleLike, handleDelete, addComment, user }) => {
  const id = useParams().id
  const [comment, resetComment] = useField('text')

  if (!blogs) {
    return <div>loading blogs...</div>
  }

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div>blog not found</div>
  }

  const showRemoveButton =
    user && blog.user && user.username === blog.user.username

  // Comment logic
  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment.value)
    resetComment()
  }

  return (
    <StyledView>
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <Row>
        <Typography variant="body2" color="textSecondary">
          by {blog.author}
        </Typography>
      </Row>
      <Row>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </Row>
      <Row>
        <Typography variant="body2" color="textSecondary">
          Added by {blog.user.name}
        </Typography>
      </Row>
      <ButtomRow>
        <Typography variant="subtitle1">{blog.likes} likes</Typography>
        {user && <StyledLike onClick={() => handleLike(blog)}>like</StyledLike>}
        {showRemoveButton && (
          <StyledRemove onClick={() => handleDelete(blog)}>remove</StyledRemove>
        )}
      </ButtomRow>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <StyledCommentInput {...comment} placeholder="add a comment" />
        <StyledAddComment type="submit">ADD COMMENT</StyledAddComment>
      </form>
      <ul>
        {(blog.comments || []).map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </StyledView>
  )
}

export default BlogView
