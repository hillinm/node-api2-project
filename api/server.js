const express = require("express");
const server = express();

const Post = require("./posts/posts-router");
const Comments = require("./comments/comments-router");

server.use(express.json());
server.use('/api/posts', Post);
server.use('/api/posts', Comments);

server.get("/", (req, res) => {
    res.send("hey there??");
})

module.exports = server;