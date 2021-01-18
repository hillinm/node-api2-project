const express = require("express");
const router = express.Router();

const dbHelper = require("../db-helpers");

router.post('/', (req, res) => {
    const newPost = req.body;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    dbHelper.insert(newPost)
        .then((post) => {
            res.status(201).json({ newPost })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    dbHelper.findById(id)
        .then((text) => {
            if (text[0] === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(text)
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
    });

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    dbHelper.findById(id)
        .then((text) => {
            if (text[0] === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else {
                dbHelper.remove(id)
                .then((text) => {
                    res.status(200).json({ message: "The post has been deleted." })
                })
                .catch(() => {
                    res.status(500).json({ error: "The post could not be removed." })
                })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "The post could not be retrieved." })
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;

    const newInfo = req.body;

    dbHelper.findById(id)
        .then((text) => {
            if (text[0] === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                if (!newInfo.title || !newInfo.contents) {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post"});
                    return
                }
                dbHelper.update(id, newInfo)
                .then(() => {
                    res.status(200).json(newInfo)
                })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

module.exports = router;
