const express = require('express');

const Projects = require('./projects-model');
const Tasks = require('./tasks-model');

const router = express.Router();

// get all projects
router.get('/', (req, res) => {
    Projects.getProjects()
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get projects' });
    });
});

// get project by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.getProjectById(id)
    .then(proj => {
        if (proj) {
            res.json(proj);
        } else {
            res.status(404).json({ message: 'Could not find the project with that id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the project.' });
    });
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     let recipeData = {};

//     Recipes.getRecipeById(id)
//     .then(recipe => {
//         if (recipe) {
//             Recipes.getInstructions(id)
//                 .then(steps => {
//                     if (steps.length) {
//                         recipeData = {...recipe, instructions: steps}
//                         res.json(recipeData);
//                     } else {
//                         res.json(recipe);
//                     }
//             })
//         } else {
//             res.status(404).json({ message: 'Could not find recipe with that id.' })
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ message: 'Failed to get the recipe.' });
//     });
// });

// Add new project
router.post('/', (req, res) => {
    const projData = req.body;

    Projects.addProject(projData)
    .then(project => {
        res.status(201).json(project);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new project.' });
    });
});

// Add new task
router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 

    Projects.getProjectById(id)
    .then(project => {
        if (project) {
        Tasks.addTask(taskData, id)
        .then(task => {
            res.status(201).json(task);
        })
        } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
        }
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new task.' });
    });
});


module.exports = router;