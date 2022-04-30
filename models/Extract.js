const mongoose = require("mongoose")

const extractSchema = new mongoose.Schema({
    discards: [{type: mongoose.Schema.Types.ObjectId, ref: "Discard"}]
})

module.exports = mongoose.model("Extract", extractSchema)
