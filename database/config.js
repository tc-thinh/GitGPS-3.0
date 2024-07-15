// imports
const path = require('path');

// constants
const root = path.resolve(__dirname);
const port = 3000;
const dbPath = path.resolve(__dirname, './instance/repos.sqlite');
const forceMigration = true;

module.exports = {
    root: root,
    PORT: port,
    dbPath: dbPath,
    forceMigration: forceMigration
};

// test
// console.log(root);
