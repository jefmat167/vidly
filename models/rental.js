const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 4,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }    
});

const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = (rental) => {
    const schema = Joi.object({

        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;