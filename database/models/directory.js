require('module-alias/register'); // Import module-alias

const { dbPromise } = require('@database');

async function insertDirectoryFromRepo(repo_id, filename, filepath, description) {
    try {
        const db = await dbPromise;
        const result = await db.run(
            `INSERT INTO directories (repo_id, filename, filepath, description) VALUES (?, ?, ?, ?)`,
            [repo_id, filename, filepath, description]
        );
        return { ok: true, message: "" };
    } catch (error) {
        console.error('Error inserting directory:', error);
        return { ok: false, message: `Error inserting directory: ${error}` };
    }
}

async function insertDirectoryFromDirectory(parent_directory_id, filename, filepath, description) {
    try {
        const db = await dbPromise;
        const result = await db.run(
            `INSERT INTO directories (parent_directory_id, filename, filepath, description) VALUES (?, ?, ?, ?)`,
            [parent_directory_id, filename, filepath, description]
        );
        return { ok: true, message: "" };
    } catch (error) {
        console.error('Error inserting directory:', error);
        return { ok: false, message: `Error inserting directory: ${error}` };
    }
}

async function getAllDirectoriesFromRepoId(repo_id) {
    try {
        const db = await dbPromise;
        const directories = await db.all(
            `SELECT * FROM directories WHERE repo_id = ?`,
            [repo_id]
        );
        return directories;
    } catch (error) {
        console.error('Error fetching directories: ', error);
    }
}

async function getAllDirectoriesFromParentDirectoryId(parent_directory_id) {
    try {
        const db = await dbPromise;
        const directories = await db.all(
            `SELECT * FROM directories WHERE parent_directory_id = ?`,
            [parent_directory_id]
        );
        return directories;
    } catch (error) {
        console.error('Error fetching directories: ', error);
    }
}

module.exports = { insertDirectoryFromRepo, insertDirectoryFromDirectory, getDirectory, getAllDirectoriesFromRepoId, getAllDirectoriesFromParentDirectoryId };
