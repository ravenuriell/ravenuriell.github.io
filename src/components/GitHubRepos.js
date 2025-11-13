import React, { useEffect, useState } from "react";

function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <p>Loading repositories...</p>;
  if (!repos.length) return <p>No repositories found.</p>;

  return (
    <div className="github-repos">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-card"
        >
          <h4>{repo.name}</h4>
          {repo.description && <p>{repo.description}</p>}
        </a>
      ))}
    </div>
  );
}

export default GitHubRepos;
