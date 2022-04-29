const mongoose = require("mongoose")

mongoose.extractSchema = new mongoose.Schema({
    discards: [{type: mongoose.Schema.Types.ObjectId, ref: "Discard"}]
})

module.exports = mongoose.model("Extract", extractSchema)
