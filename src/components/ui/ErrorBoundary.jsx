import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[55vh] items-center justify-center flex-col gap-4 text-white/40">
          <div className="text-4xl">⬡</div>
          <p className="text-sm">3D scene unavailable — WebGL may not be supported in this environment.</p>
        </div>
      )
    }
    return this.props.children
  }
}
