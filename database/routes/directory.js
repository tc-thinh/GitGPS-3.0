require('module-alias/register'); // Import module-alias

const express = require('express');
const router = express.Router();
const { insertDirectoryFromRepo, insertDirectoryFromDirectory } = require('@models/directory');

router.post("/add-directory-from-repo", async (req, res) => {
    const { repo_id, filename, filepath, description } = req.body;
    try {
        const status = await insertDirectoryFromRepo(repo_id, filename, filepath, description);
        if (!status.ok) {
            return res.status(500).json(status); 
        }
        // 201 Created: Request succeeded, new resource created
        res.status(201).json({ ok: true, description: "Directory added successfully." });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, description: `Error: Internal server error occurred while inserting the new directory:\n${error}` });
    }
});

router.post("/add-directory-from-directory", async (req, res) => {
    const { parent_directory_id, filename, filepath, description } = req.body;
    try {
        const status = await insertDirectoryFromDirectory(parent_directory_id, filename, filepath, description);
        if (!status.ok) {
            return res.status(500).json(status); 
        }
        // 201 Created: Request succeeded, new resource created
        res.status(201).json({ ok: true, description: "Directory added successfully." });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, description: `Error: Internal server error occurred while inserting the new directory:\n${error}` });
    }
});

module.exports = router;
