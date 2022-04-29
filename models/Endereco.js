const mongoose = require("mongoose")


const enderecoSchema = new mongoose.Schema({
    id: {
        Object: id,
    },
    rua: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    },
   
})

module.exports = mongoose.model("Endereco", enderecoSchema)