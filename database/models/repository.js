require('module-alias/register');

const { dbPromise } = require('@database');

async function insertRepository(name, description, url) {
    const db = await dbPromise;
    const result = await db.run(
        `INSERT INTO repositories (name, description, url) VALUES (?, ?, ?)`,
        [name, description, url]
    );
    console.log(`A row has been inserted with rowid ${result.lastID}`);
}

module.exports = { insertRepository };
