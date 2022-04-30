const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    coupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupom',
        required: true,
    }]   
})

module.exports = mongoose.model("PartnerCompany", companySchema)
