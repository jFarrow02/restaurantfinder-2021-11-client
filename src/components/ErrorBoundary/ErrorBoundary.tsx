import React, {ErrorInfo} from 'react';
import './ErrorBoundary.css';


interface ErrorBoundaryPropsInterface {
    children: JSX.Element,
}

interface ErrorBoundaryStateInterface {
    hasError: boolean,
}

export default class ErrorBoundary extends React.Component <ErrorBoundaryPropsInterface, ErrorBoundaryStateInterface>{

    constructor(props:ErrorBoundaryPropsInterface) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error:Error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error:Error, errorInfo:ErrorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return <h1>There was an error</h1>
        }
        return this.props.children;
    }
};
