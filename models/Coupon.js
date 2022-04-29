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
    percentage: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("Coupon", couponSchema)
