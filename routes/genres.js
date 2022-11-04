const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

//add a new genre
router.post('/', auth, (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    const genre = new Genre({name: req.body.name});
    genre.save()
        .then(result => {res.send('saved successfully... ' + result)})
        .catch(err => res.send('failed to save... ' + err));
});

//update a genre with a specified ID
router.put('/:id', auth, async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send("The genre with the given ID not found..."); 

    res.send(genre);
});

router.get('/', (req, res) => {

    // throw new Error('Something failed fatally...');
    Genre.find().sort('name')
    .then((result) => res.send(result))
    .catch(err => res.send("Something went wrong " + err))
});

//get a genre with a specified ID
router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with the given ID not found...");

    res.send(genre);
});

//delete a genre with a specified id
router.delete('/:id', [auth, admin], async(req, res) => {

    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(400).send("genre with the given id not found...");

    res.send(genre);
});

module.exports = router;