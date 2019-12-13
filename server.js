const express = require('express');

const ProjectsRouter = require('./api/projects-router');
const TasksRouter = require('./api/tasks-router');
const ResourcesRouter = require('./api/resources-router');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectsRouter);
server.use('/api/tasks', TasksRouter);
server.use('/api/resources', ResourcesRouter);

module.exports = server;