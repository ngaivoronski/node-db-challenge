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

// get project by id and detailed description
router.get('/:id', (req, res) => {
    const { id } = req.params;
    let projectData = {};

    Projects.getProjectById(id)
    .then(proj => {
        if (proj) {
            Projects.getProjectTasks(id)
                .then(tasks => {
                    if (tasks.length) {
                        Projects.getResourcesForProject(id)
                            .then(resources => {
                                if (resources.length) {
                                    projectData = {...proj, tasks: tasks, resources: resources}
                                    res.json(projectData);
                                } else {
                                    projectData = {...proj, tasks: tasks}
                                    res.json(projectData);
                                }
                            })
                    } else {
                        res.json(proj);
                    }
            })
        } else {
            res.status(404).json({ message: 'Could not find the project with that id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the project.' });
    });
});

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

// Assign resource to task
router.post('/:id/resources', (req, res) => {
    const resource_id = req.body.resource_id;
    const project_id = req.params.id; 

    Projects.assignResourceToProject(resource_id, project_id)
    .then(project => {
        res.status(201).json(project);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new project.' });
    });
});


module.exports = router;