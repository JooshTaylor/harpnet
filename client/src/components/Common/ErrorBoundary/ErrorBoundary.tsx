import React from 'react'

interface Props {
  children: JSX.Element
}
interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  public state = {
    hasError: false
  }

  public static getDerivedStateFromError(error: object) {
    return { hasError: true }
  }

  public render(): JSX.Element {
    if (this.state.hasError) {
      return <h1>Something went wrong...</h1>
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
