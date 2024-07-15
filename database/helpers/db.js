require('module-alias/register');

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const config = require('@config'); // Import the configuration

const dbPromise = sqlite.open({
    filename: config.dbPath,
    driver: sqlite3.Database,
});

async function setupDB() {
    const db = await dbPromise;
    await db.migrate({
        force: config.forceMigration,
        // migrationsPath: "./migrations",
    });
}

module.exports = { dbPromise, setupDB };
