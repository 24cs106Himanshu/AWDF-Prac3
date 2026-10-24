import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-container not-found-page">
      <div className="section-container">
        <div className="not-found-card">
          <div className="error-code">404</div>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            The page you are looking for does not exist or has been moved to another route.
          </p>
          <div className="error-actions">
            <Link to="/" className="back-home-button">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
