const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true
    },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().max(10).required(),
        phone: Joi.string().max(14).required(),
        isGold: Joi.boolean().required()
    })

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validate = validateCustomer;