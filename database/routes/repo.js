require('module-alias/register'); // Import module-alias

const express = require('express');
const router = express.Router();
const { insertRepository } = require('@models/repository');

router.post("/add-repo", async (req, res) => {
    const name = req.body.name; 
    const url = req.body.url; 
    try {
        await insertRepository(name, url);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while adding the repository');
    }
    res.status(201).send('Repository added successfully');
});

module.exports = router;
