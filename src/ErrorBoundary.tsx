import { Component, ErrorInfo } from "react";
import DisplayedError from "./components/error/DisplayedError";

interface IErrorBoundaryProps {
  children: JSX.Element;
}

interface IErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return <DisplayedError errorMessage={this.state.error.message} />;
  }
}
