import { Component } from 'react';
import { useTranslation } from 'react-i18next';
import type { ErrorBoundaryProps } from './interfaces/ErrorBoundaryProps';
import type { ErrorBoundaryState } from './interfaces/ErrorBoundaryState';

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

const DefaultFallback = () => {
  const { t } = useTranslation();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-boundary f-container">
      <h1 className="h2">{t('components.errorBoundary.title')}</h1>
      <p className="text">{t('components.errorBoundary.message')}</p>
      <button type="button" className="btn btn--primary btn--md" onClick={handleReload}>
        {t('components.errorBoundary.reload')}
      </button>
    </div>
  );
};

export default ErrorBoundaryInner;
