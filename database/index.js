require('module-alias/register'); // Import module-alias

const express = require('express');
const { setupDB } = require('@database');
const repoRouter = require('@routes/repository');
const directoryRouter = require('@routes/directory');

const app = express();
const port = 3000;

app.use(express.json());
app.use(repoRouter);
app.use(directoryRouter);

async function setup() {
    try {
        await setupDB({ force: true });
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}

setup();
