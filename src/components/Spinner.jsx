function Spinner({ message = "Fetching repositories from GitHub API..." }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;
