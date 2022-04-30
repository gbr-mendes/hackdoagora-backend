const controller = {}
const companyModel = require("../models/company")
const companyValidator = require("../validators/company")

controller.createEmpresaParceira = async (req, resp) => {
  const { name, cnpj, cupom } = req.body
  const data = { name, cnpj, cupom }
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
    const empresaParceira = await companyModel.create(data)
    if (empresaParceira) {
      resp.status(201).json({ success: "Empresa parceira criada com sucesso!" })
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.showEmpresaParceira = async (req, resp) => {
  const { id } = req.params
  try {
    const empresaParceira = await companyModel.findById(id)
    if (empresaParceira) {
      resp.status(200).json(empresaParceira)
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.updateEmpresaParceira = async (req, resp) => {
}
module.exports = controller