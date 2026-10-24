function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon" aria-hidden="true">
        ⚠️
      </div>
      <div className="error-details">
        <h3 className="error-heading">Failed to Load Repositories</h3>
        <p className="error-text">
          {error || "An unexpected error occurred while communicating with the GitHub API."}
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="retry-button"
          aria-label="Retry fetching GitHub repositories"
        >
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
