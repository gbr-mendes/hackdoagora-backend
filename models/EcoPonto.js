const mongoose = require("mongoose")


const ecoPontoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    local: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("EcoPonto", ecoPontoSchema)