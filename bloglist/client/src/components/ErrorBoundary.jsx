import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

// Class component for Error Boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Blog App
              </Typography>
            </Toolbar>
          </AppBar>
          <h2>Something went wrong.</h2>
          <p>{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
