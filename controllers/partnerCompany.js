const controller = {}
const PartnerCompanyModel = require("../models/partnerCompany")
const CouponModel = require("../models/coupon")
const companyValidator = require("../validators/company")

controller.createPartnerCompany = async (req, resp) => {
  const { name, cnpj, coupons } = req.body
  const data = { name, cnpj, couponsIds }
  if(coupons.length < 1){
    resp.status(400).json({error: "Você precisa adicionar ao menos um cupom"})
    return
  }
  const couponsIds = coupons.map(coupon=>{
      const {_id} = await CouponModel.create(coupon)
      return _id
  })
  const { error } = companyValidator.registerValidation(data)
  if (error) {
    const errorMessage = { error: error.details[0].message }
    resp.status(400).json(errorMessage)
    return
  }
  const exists = await PartnerCompanyModel.findOne({ cnpj })
  if (exists) {
    resp.status(400).json({ error: "Já existe uma empresa parceira com este CNPJ" })
    return
  }

  try {
    const PartnerCompany = await PartnerCompanyModel.create(data)
    if (PartnerCompany) {
      resp.status(201).json({ success: "Empresa parceira criada com sucesso!" })
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }

}

controller.showPartnerCompany = async (req, resp) => {
  const { id } = req.params
  try {
    const partnerCompany = await PartnerCompanyModel.findById(id)
    if (partnerCompany) {
      resp.status(200).json(partnerCompany)
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.listPartnerCompanies = async (req, resp) => {
  try {
    const partnerCompanies = await PartnerCompanyModel.findAll()
    if (partnerCompanies) {
      resp.status(200).json(partnerCompanies)
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.updatePartnerCompany = async (req, resp) => {
  const { id } = req.params
  const { name, cnpj, cupom } = req.body
  const data = { name, cnpj, cupom }
  const { error } = companyValidator.updateValidation(data)
  if (error) {
    const errorMessage = { error: error.details[0].message }
    resp.status(400).json(errorMessage)
    return
  }
  try {
    const partnerCompany = await PartnerCompanyModel.findByIdAndUpdate(id, data, { new: true })
    if (partnerCompany) {
      resp.status(200).json(partnerCompany)
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.deletePartnerCompany = async (req, resp) => {
  const { id } = req.params
  try {
    const partnerCompany = await PartnerCompanyModel.findByIdAndDelete(id)
    if (partnerCompany) {
      resp.status(200).json({ success: "Empresa parceira deletada com sucesso!" })
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

module.exports = controller