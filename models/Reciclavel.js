const mongoose = require("mongoose")


const reciclavelSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
    },

})

module.exports = mongoose.model("Reciclavel", reciclavelSchema)