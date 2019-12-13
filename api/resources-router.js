const express = require('express');

const Resources = require('./resources-model');

const router = express.Router();

router.get('/', (req, res) => {
    Resources.getResources()
    .then(resources => {
        res.json(resources);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get resources.' });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Resources.getResourceById(id)
    .then(resource => {
        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ message: 'Could not find the resource with that id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the resource.' });
    });
});

router.post('/', (req, res) => {
    const rescData = req.body;

    Resources.addResource(rescData)
    .then(resource => {
        res.status(201).json(resource);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new resource.' });
    });
});



module.exports = router;