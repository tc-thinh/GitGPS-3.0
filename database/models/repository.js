require('module-alias/register');

const { dbPromise } = require('@database');

async function insertRepository(name, url) {
    const db = await dbPromise;
    const result = await db.run(
        `INSERT INTO repositories (name, url) VALUES (?, ?)`,
        [name, url]
    );
    console.log(`A row has been inserted with rowid ${result.lastID}`);
}

module.exports = { insertRepository };
