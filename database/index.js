require('module-alias/register'); // Import module-alias

const express = require('express');
const { setupDB } = require('@database');
const repoRouter = require('@routes/repository');
const directoryRouter = require('@routes/directory');
const { PORT } = require('@config');

const app = express();

app.use(express.json());
app.use(repoRouter);
app.use(directoryRouter);

async function setup() {
    try {
        await setupDB({ force: true });
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

setup();
