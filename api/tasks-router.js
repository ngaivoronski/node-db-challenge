const express = require('express');

const Tasks = require('./tasks-model');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.getTasks()
    .then(tasks => {
        res.json(tasks);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks' });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Tasks.getTaskById(id)
    .then(task => {
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Could not find the task with that id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the task.' });
    });
});



module.exports = router;