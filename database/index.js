const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const express = require('express');

// TODO: Create a configuration object for the database
const app = express(); // Initialize the Express application
const port = 3000; // Set the server port to 3000
const dbPath = "./instance/repos.sqlite";

// Middleware to parse JSON bodies
app.use(express.json());

// Define the database connection, might be migrated to a separate module
// Open a connection to the database and return a Promise
const dbPromise = sqlite.open({
    filename: dbPath,
    driver: sqlite3.Database,
});

async function setupDB(args) {
    const db = await dbPromise; // Await the resolved database promise to get the database connection
    await db.migrate({
        force: args.force,
        // migrationsPath: "./migrations",
    }); // Run the migration function to create the database tables
}

async function insertRepository(name, url) {
    const db = await dbPromise;
    const result = await db.run(
        `INSERT INTO repositories (name, url) VALUES (?, ?)`,
        [name, url]
    );
    console.log(`A row has been inserted with rowid ${result.lastID}`);
}

// Handle POST request for adding a new task
app.post("/add-repo", async (req, res) => {
    const name = req.body.name; 
    const url = req.body.url; 
    try {
        await insertRepository(name, url); // Insert the repository into the database
    }
    catch (error) {
        console.error(error); // Log any errors to the console
        return res.status(500).send('An error occurred while adding the repository');
    }
    res.status(201).send('Repository added successfully');
});

// Set up function
async function setup() {
    try {
        await setupDB({ force: true }); // Set up the database from migrations
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`); // Log the server's listening status
        });
    } catch (error) {
        console.error(error); // Log any errors to the console
    }
}

setup();
