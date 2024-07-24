-- Up

CREATE TABLE repositories (
    repo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE repo_directories (
    directory_id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NULL,
    parent_directory_id INTEGER NULL,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(1023) NOT NULL,
    description TEXT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repo_id) REFERENCES repositories(repo_id),
    FOREIGN KEY (parent_directory_id) REFERENCES repo_directories(directory_id)
);

CREATE TABLE repo_files (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NULL,
    parent_directory_id INTEGER NULL,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(1023) NOT NULL,
    description TEXT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repo_id) REFERENCES repositories(repo_id),
    FOREIGN KEY (parent_directory_id) REFERENCES repo_directories(directory_id)
);

-- Down

DROP TABLE repositories;
DROP TABLE repo_directories;
DROP TABLE repo_files;
