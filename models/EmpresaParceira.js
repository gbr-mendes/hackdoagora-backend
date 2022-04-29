const mongoose = require("mongoose")


const empresaSchema = new mongoose.Schema({
   
    nome: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    cupom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cupom',
        required: true,
    },
   
})

module.exports = mongoose.model("EmpresaParceira", empresaSchema)