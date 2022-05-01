const controller = {}
const CouponModel = require("../models/Coupon")
const CompanyModel = require("../models/PartnerCompany")

controller.listCoupons = async (req, resp) => {
    // #swagger.tags = ['Coupon']
    // #swagger.description = 'Endpoint para listar cupons. Nenhum privilégio administrativo é requerido'
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

controller.filterCouponsByCompany = async (req, res) => {
    // #swagger.tags = ['Coupon']
    // #swagger.description = 'Endpoint para filtrar cupons pelo nome da empresa. Nenhum privilégio administrativo é requerido'
    const name = req.params.companyName
    try {
        const partnerCompany = await CompanyModel.findOne({name})
        const queryset = []
        if (partnerCompany) {
            const coupons = await CouponModel.find({_id: {$in: partnerCompany.coupons}})
            coupons.map(coupon => {
                const {_id, name, value} = coupon
                queryset.push({_id, name, value, companyName: partnerCompany.name, companyImage:partnerCompany.image} )
            })
            res.status(200).json(queryset)
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