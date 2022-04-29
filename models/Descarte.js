const mongoose = require("mongoose")


const descarteSchema = new mongoose.Schema({
    
    reciclavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reciclavel',
        required: true,
    },
    quantidade: {
        type: Number,
    },
   
})

module.exports = mongoose.model("Descarte", descarteSchema)