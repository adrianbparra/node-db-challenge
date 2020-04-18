const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projects/projects-router.js");

const server = express();

server.use(express.json());
server.use(helmet())



server.use("/api/projects", projectsRouter)













module.exports = server;