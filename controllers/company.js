const controller = {}
const companyModel = require("../models/company")
const companyValidator = require("../validators/company")

controller.createPartnerCompany = async (req, resp) => {
  const { name, cnpj, coupons } = req.body
  const data = { name, cnpj, coupons }
  const { error } = companyValidator.registerValidation(data)
  if (error) {
    const errorMessage = { error: error.details[0].message }
    resp.status(400).json(errorMessage)
    return
  }
  const exists = await companyModel.findOne({ cnpj })
  if (exists) {
    resp.status(400).json({ error: "Já existe uma empresa parceira com este CNPJ" })
    return
  }

  try {
    const partnerCompany = await companyModel.create(data)
    if (partnerCompany) {
      resp.status(201).json({ success: "Empresa parceira criada com sucesso!" })
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.retrivePartnerCompany = async (req, resp) => {
  const { id } = req.params
  try {
    const partnerCompany = await companyModel.findById(id)
    if (partnerCompany) {
      resp.status(200).json(partnerCompany)
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.updatePartnerCompany = async (req, resp) => {
}
module.exports = controller