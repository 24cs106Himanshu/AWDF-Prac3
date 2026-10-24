function RepoList({ repos = [], searchTerm = "" }) {
  if (!repos || repos.length === 0) {
    return (
      <div className="empty-repos-card">
        <p className="empty-repos-text">
          {searchTerm
            ? `No repositories found matching "${searchTerm}". Try a different keyword.`
            : "No public repositories found for this GitHub account."}
        </p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <article key={repo.id} className="repo-card">
          <div className="repo-header">
            <h3 className="repo-name">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
                title={`Open ${repo.name} on GitHub`}
              >
                {repo.name}
              </a>
            </h3>
            <span className="repo-stars" title={`${repo.stargazers_count} stars`}>
              ⭐ {repo.stargazers_count}
            </span>
          </div>

          <p className="repo-description">
            {repo.description || "No description provided for this repository."}
          </p>

          <div className="repo-meta-footer">
            {repo.language && (
              <span className="repo-language">
                <span className="language-dot"></span>
                {repo.language}
              </span>
            )}
            {typeof repo.forks_count === "number" && (
              <span className="repo-forks" title={`${repo.forks_count} forks`}>
                🍴 {repo.forks_count}
              </span>
            )}
            {repo.updated_at && (
              <span className="repo-updated">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default RepoList;
