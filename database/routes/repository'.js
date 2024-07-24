require('module-alias/register'); // Import module-alias

const express = require('express');
const router = express.Router();
const { insertRepository, getRepository, searchRepository } = require('@models/repository');

router.post("/add-repo", async (req, res) => {
    const { name, description, url } = req.body;
    try {
        const status = await insertRepository(name, description, url);
        if (!status.ok) {
            // Ensure response is sent once by returning here
            return res.status(500).json(status); 
        }
        // 201 Created: Request succeeded, new resource created
        res.status(201).json({ ok: true, description: "Repository added successfully." });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, description: `Error: Internal server error occurred while inserting the new repo:\n${error}` });
    }
});

router.get("/get-repo", async (req, res) => {
    const { repo_id } = req.query;
    try {
        const repo = await getRepository(repo_id);
        if (!repo) {
            // 404 Not Found: Server cannot find the requested resource
            return res.status(404).json({ ok: false, description: "Repository not found" });
        }
        return res.status(200).json({ ok: true, description: "Repository fetched successfully.", repo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, description: `Error: Internal server error occurred while fetching the repository with id=${repo_id}:\n${error}` });
    }
});

router.get("/search-repo", async (req, res) => {
    const { keyword } = req.query;
    try {
        const repos = await searchRepository(keyword);
        return res.status(200).json(repos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, description: `Error: Internal server error occurred while fetching the repository:\n${error}` });
    }
})

module.exports = router;
