import { StyledButton, LoginInput } from '../styles'
import { useField } from '../hooks/useField'

// Login form component
const LoginForm = ({ handleLogin }) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleLogin(username.value, password.value)
    resetUsername()
    resetPassword()
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <LoginInput {...username} />
      </div>
      <div>
        <LoginInput {...password} />
      </div>
      <StyledButton type="submit">LOGIN</StyledButton>
    </form>
  )
}

export default LoginForm
