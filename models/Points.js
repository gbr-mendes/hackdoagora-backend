const mongoose = require("mongoose")


const pointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})



module.exports = mongoose.model("Points", userSchema)