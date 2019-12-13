const express = require('express');

// const RecipesRouter = require('./api/recipes-router');
// const IngredientsRouter = require('./api/ingredients-router');

const server = express();

server.use(express.json());
// server.use('/api/recipes', RecipesRouter);
// server.use('/api/ingredients', IngredientsRouter);

module.exports = server;