require('module-alias/register');

const { dbPromise } = require('@database');

async function insertRepository(name, description, url) {
    try {
        const db = await dbPromise;
        const result = await db.run(
            `INSERT INTO repositories (name, description, url) VALUES (?, ?, ?)`,
            [name, description, url]
        );
        return { ok: true, message: "" };
    } catch (error) {
        console.error('Error inserting repository:', error);
        return { ok: false, message: `Error inserting repository: ${error}` };
    }
}

async function getRepository(repo_id) {
    try {
        const db = await dbPromise;
        const repo = await db.get(
            `SELECT * FROM repositories WHERE repo_id = ?`,
            [repo_id]
        );
        return repo;
    } catch (error) {
        console.error('Error fetching repository: ', error);
    }
}

async function searchRepository(searchPhrase) {
    try {
        const db = await dbPromise;
        const repos = await db.all(
            `SELECT * FROM repositories WHERE name LIKE ?`,
            [`%${searchPhrase}%`]
        );
        return { ok: true, repos };
    } catch (error) {
        console.error('Error fetching repository: ', error)
        return { ok: false, repos: [] };
    }
}

module.exports = { insertRepository, getRepository, searchRepository };
