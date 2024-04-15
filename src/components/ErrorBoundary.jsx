import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center flex-col gap-2">
          <h1 className="text-center mt-64 font-semibold text-8xl text-red-500">
            Error
          </h1>
          <h1 className="text-center font-semibold text-3xl">
            Something went wrong!
          </h1>
          <p className="text-center">
            Please contact administrator for further assistance
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
