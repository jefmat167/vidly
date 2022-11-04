const {Movie, validate} = require('../models/movie');
const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

router.post('/', async (req, res) =>{

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre...');

    let movie = new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    const result = await movie.save();
    console.log(result);
    res.send(result);
});

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
})

module.exports = router;