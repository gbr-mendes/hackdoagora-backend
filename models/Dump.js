const mongoose = require("mongoose")

const dumpSchema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    capacities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capacity',
        required: true,
    }],
   
})

module.exports = mongoose.model("Dump", dumpSchema)
