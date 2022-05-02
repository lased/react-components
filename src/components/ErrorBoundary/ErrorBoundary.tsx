import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
