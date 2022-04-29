const mongoose = require("mongoose")

const discardSchema = new mongoose.Schema({
    recyclable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recyclable',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("Discard", discardSchema)
