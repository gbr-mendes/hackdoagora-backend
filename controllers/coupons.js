
const controller = {}
const Coupon = require('../models/coupon')
const PartnerCompany = require('../models/partnerCompany')

controller.listcoupons = async (req, res) => {
    const {name} = req.query
    const query = name ? {name: {$regex: name, $options: 'i'}} : {}
    try {
        const coupons = await Coupon.find(query)
        res.status(200).json(coupons)
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}

controller.companyCoupons = async (req, res) => {
    const {name} = req.params
    try {
        const partnerCompany = await PartnerCompany.findOne({name})
        if (partnerCompany) {
            const coupons = await Coupon.find({_id: {$in: partnerCompany.coupons}})
            res.status(200).json(coupons)
        }
        else {
            res.status(400).json({error: "Empresa não encontrada"})
        }
    }
    catch (err) {
        res.status(500).json({error: err})
    }
}

module.exports = controller