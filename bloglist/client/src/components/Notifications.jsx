import { Alert } from '@mui/material'
import { useNotificationValue } from '../contexts/NotificationContext'

// Notifications component
const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  const { message, type } = notification

  return (
    <Alert
      severity={type === 'error' ? 'error' : 'success'}
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Notification
