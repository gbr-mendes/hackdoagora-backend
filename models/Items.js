const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ecoPonto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EcoPonto',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


module.exports = mongoose.model("Items", userSchema)