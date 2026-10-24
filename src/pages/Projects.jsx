import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RepoList from "../components/RepoList";

// Configurable default GitHub username
export const DEFAULT_GITHUB_USERNAME = "24cs106Himanshu";

function Projects({ defaultUsername = DEFAULT_GITHUB_USERNAME }) {
  // Asynchronous state management using useState
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration and search state
  const [activeUsername, setActiveUsername] = useState(defaultUsername);
  const [usernameInput, setUsernameInput] = useState(defaultUsername);
  const [searchTerm, setSearchTerm] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  // Lifecycle API integration using useEffect
  useEffect(() => {
    if (!activeUsername.trim()) {
      return;
    }

    const controller = new AbortController();

    async function fetchRepositories() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(activeUsername)}/repos?sort=updated&per_page=30`,
          { signal: controller.signal }
        );

        // Explicitly handle non-successful HTTP responses
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              `GitHub user "${activeUsername}" was not found (HTTP 404). Please verify the username.`
            );
          }
          if (response.status === 403) {
            throw new Error(
              "GitHub API rate limit exceeded (HTTP 403). Please try again later."
            );
          }
          throw new Error(
            `GitHub API request failed with status ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Safely validate response data shape
        if (!Array.isArray(data)) {
          throw new Error("Malformed data: Received unexpected response format from GitHub.");
        }

        setRepos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "An error occurred while fetching repositories.");
          setRepos([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositories();

    return () => {
      controller.abort();
    };
  }, [activeUsername, retryKey]);

  // Retry handler
  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  // Switch or test username
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (!trimmed) {
      setError("Please enter a valid GitHub username.");
      setRepos([]);
      setIsLoading(false);
      return;
    }
    if (trimmed !== activeUsername) {
      setActiveUsername(trimmed);
      setSearchTerm("");
    } else {
      // If same username re-submitted, trigger a fresh fetch
      handleRetry();
    }
  };

  // Case-insensitive client-side search filtering (no network calls on keystroke)
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="page-container projects-page">
      <section className="portfolio-section">
        <div className="section-container">
          <div className="section-header-block">
            <h2 className="section-heading">GitHub Projects Showcase</h2>
            <p className="section-subtext">
              Real-time API integration fetching public repositories from the official GitHub REST API.
            </p>
          </div>

          {/* GitHub User Switcher & Test Controls */}
          <div className="api-config-bar">
            <form onSubmit={handleUsernameSubmit} className="username-form">
              <label htmlFor="github-user-input" className="config-label">
                <strong>GitHub Username:</strong>
              </label>
              <div className="input-with-button">
                <input
                  id="github-user-input"
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter GitHub username..."
                  className="config-input"
                />
                <button type="submit" className="config-button">
                  Load Repositories
                </button>
              </div>
            </form>

            <div className="quick-test-badges">
              <span className="test-label">Quick Test Users:</span>
              <button
                type="button"
                className="test-badge-btn"
                onClick={() => {
                  setUsernameInput("24cs106Himanshu");
                  setActiveUsername("24cs106Himanshu");
                }}
              >
                24cs106Himanshu
              </button>
              <button
                type="button"
                className="test-badge-btn"
                onClick={() => {
                  setUsernameInput("facebook");
                  setActiveUsername("facebook");
                }}
              >
                facebook
              </button>
              <button
                type="button"
                className="test-badge-btn test-error-btn"
                onClick={() => {
                  setUsernameInput("nonexistent-user-404-test-xyz");
                  setActiveUsername("nonexistent-user-404-test-xyz");
                }}
                title="Test 404 HTTP Error Handling"
              >
                ⚡ Test 404 Error
              </button>
            </div>
          </div>

          {/* Search Bar (Only shown when not in error and repos exist) */}
          {!error && (
            <div className="search-filter-card">
              <div className="search-input-wrapper">
                <span className="search-icon" aria-hidden="true">
                  🔍
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter repositories by name (case-insensitive)..."
                  className="search-input"
                  aria-label="Filter repositories by name"
                  disabled={isLoading}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="clear-search-btn"
                    aria-label="Clear search filter"
                  >
                    ✕
                  </button>
                )}
              </div>
              {!isLoading && repos.length > 0 && (
                <div className="results-summary">
                  Showing <strong>{filteredRepos.length}</strong> of{" "}
                  <strong>{repos.length}</strong> public repositories for @
                  <strong>{activeUsername}</strong>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Content Display: Loading, Error, or RepoList */}
          <div className="api-results-area">
            {isLoading ? (
              <Spinner message={`Loading repositories for @${activeUsername} from GitHub...`} />
            ) : error ? (
              <ErrorMessage error={error} onRetry={handleRetry} />
            ) : (
              <RepoList repos={filteredRepos} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
