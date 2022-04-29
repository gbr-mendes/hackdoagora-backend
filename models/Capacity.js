const mongoose = require("mongoose")

const capacitySchema = new mongoose.Schema({
    recyclable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recyclable',
        required: true,
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    maxAmount: {
        type: Number,
        default: 100000
    },
       
})

module.exports = mongoose.model("Capacity", capacitySchema)
