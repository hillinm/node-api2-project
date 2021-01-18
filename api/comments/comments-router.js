const express = require("express");
const router = express.Router();

const dbHelper = require("../db-helpers");

router.post("/:id/comments", (req, res) => {
    const { id } = req.params;

    const newComment = { ...req.body, post_id: id };

    dbHelper.findById(id)
        .then((data) => {
            if (data[0] === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                if (!newComment) {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." });
                    return;
                }
            dbHelper.insertComment(newComment)
                .then((comment) => {
                    res.status(201).json(comment)
                })
                .catch((err) => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
            }
        })
})

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;

    dbHelper.findById(id)
        .then((data) => {
            if (data[0] === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                dbHelper.findPostComments(id)
                .then((comment) => {
                    res.status(201).json(comment)
                })
                .catch((err) => {
                    res.status(500).json({ error: "The comments information could not be retrieved." })
                });
            }});
})

module.exports = router;