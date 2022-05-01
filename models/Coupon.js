const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("Coupon", couponSchema)
