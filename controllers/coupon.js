const controller = {}
const CouponModel = require("../models/Coupon")
const CompanyModel = require("../models/PartnerCompany")

controller.listCoupons = async (req, resp) => {
    try{
        const coupons = await CouponModel.find()
        const queryset = Promise.all(
            coupons.map(async (coupon) => {
                const {id, name, value} = coupon
                const companies = await CompanyModel.find()
                const partnerCompany = {}
                companies.forEach(company => {
                    if(company.coupons.includes(id)){
                        partnerCompany.name = company.name
                        partnerCompany.image = company.image
                    }
                })
                return {id, name, value, company: partnerCompany.name, image: partnerCompany.image}
            })
        )
        resp.status(200).json(await queryset)
    }catch(err){
        console.log(err)
        resp.status(500).json({error: "Ocorreu um erro ao filtrar cupons"})
    }
}

module.exports = controller