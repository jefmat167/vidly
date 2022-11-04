const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details.message[0]);

    const customer = new Customer({
        name: req.body.name, 
        phone: req.body.phone,
        isGold: true
    }); 

    const result = await customer.save();
    res.send(result); 
});

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer with the given ID not found...");

    res.send(customer);
});

router.put('/:id', async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details.message[0]);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        {new: true}
    );

    if(!customer) return res.status(400).send('Customer with the given ID not found...');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(400).send("Customer with the given ID not found...")
    res.send(customer);
});

module.exports = router;