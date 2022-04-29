const mongoose = require("mongoose")


const capacidadeSchema = new mongoose.Schema({
    
    reciclavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reciclavel',
        required: true,
    },
    qtdAtual: {
        type: Number,
    },
    qntMaxima: {
        type: Number,
    },
       
})

module.exports = mongoose.model("Capacidade", capacidadeSchema)