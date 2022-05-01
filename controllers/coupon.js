const controller = {}
const CouponModel = require("../models/Coupon")
const CompanyModel = require("../models/PartnerCompany")

controller.listCoupons = async (req, resp) => {
    try{
        const coupons = await CouponModel.find()
        const queryset = Promise.all(
            coupons.map(async (coupon) => {
                const {id, name, value} = coupon
                const company = await CompanyModel.findOne({id:{$in: coupons}})
                return {id, name, value, company: company.name}
            })
        )
        resp.status(200).json(await queryset)
    }catch(err){
        resp.status(500).json({error: "Ocorreu um erro ao filtrar cupons"})
    }
}

module.exports = controller