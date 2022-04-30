const mongoose = require("mongoose")


const lixeiraSchema = new mongoose.Schema({

    endereco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
        required: true,
    },
    capacidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capacidade',
        required: true,
    },

})

module.exports = mongoose.model("Lixeira", lixeiraSchema)