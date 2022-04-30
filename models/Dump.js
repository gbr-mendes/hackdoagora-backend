const mongoose = require("mongoose")

const dumpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    region: {
        type: String,
        enum: ["Centro", "Sul", "Oeste", "Norte", "Leste"],
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    capacities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capacity',
        required: true,
    }],
})

module.exports = mongoose.model("Dump", dumpSchema)
