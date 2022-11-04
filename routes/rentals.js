const {Rental, validate} = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    const session = await mongoose.startSession();

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Customer does not exist...");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Movie does not exist...");

    if(movie.numberInStock === 0) return res.status(400).send("Movie not in stock");

    let rental = new Rental({  
        customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,      
        }
    });

    try {
        session.startTransaction();
        const opt = { session }
        await rental.save(opt);

        movie.numberInStock--;
        await movie.save(opt);
        
        await session.commitTransaction();
        await session.endSession();

        res.send("rent successful");

        // const result = await session.withTransaction(async (session) => {
        //     await rental.save({session: session});
        //     movie.numberInStock--;
        //     await movie.save({session: session});
        // });

        // res.send("sent successful " + result);
    
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        res.send("failed: " + error)
    }
    

});

router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = Rental.findById(req.params.id);
    if (!rental) return res.status(400).send('No rental with the given Id...');

    res.send(rental);
})

module.exports = router;