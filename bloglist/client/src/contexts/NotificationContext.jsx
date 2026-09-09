import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext(null)

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (message, type = 'success', timeout = 5000) => {
    dispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout)
  }
}

export default NotificationContext
