const mongoose = require("mongoose")


const cupomSchema = new mongoose.Schema({
    id: {
        Object: id,
    },
    nome: {
        type: String,
    },
    valor: {
        type: Number,
        required: true,
    },
    percentual: {
        type: Number,
    },
    codigo: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("Cupom", cupomSchema)