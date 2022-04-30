const mongoose = require("mongoose")

const recyclableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },

})

module.exports = mongoose.model("Recyclable", recyclableSchema)
