const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Address", addressSchema)
