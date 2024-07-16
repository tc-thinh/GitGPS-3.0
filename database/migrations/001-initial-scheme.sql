-- Up

CREATE TABLE repositories (
    repo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE repo_components (
    component_id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NOT NULL,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(1023) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repo_id) REFERENCES repositories(repo_id)
);

-- Down

DROP TABLE repo_components;
DROP TABLE repositories;
