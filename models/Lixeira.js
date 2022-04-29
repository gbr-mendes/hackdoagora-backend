const mongoose = require("mongoose")


const lixeiraSchema = new mongoose.Schema({
    id: {
        Object: id,
    },
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