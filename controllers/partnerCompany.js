const controller = {}
const PartnerCompanyModel = require("../models/PartnerCompany")
const CouponModel = require("../models/Coupon")
const companyValidator = require("../validators/company")
const cloudinary = require("../utils/cloudinary")

controller.createPartnerCompany = async (req, resp) => {
  const { name, cnpj, coupons } = req.body
  const { error } = companyValidator.registerValidation({ name, cnpj, coupons })
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

  const couponsIds = await Promise.all(coupons.map(async (coupon) => {
    const { _id } = await CouponModel.create(coupon)
    return _id
  }))

  try {
    const PartnerCompany = await PartnerCompanyModel.create({ name, cnpj, coupons: couponsIds })
    if (PartnerCompany) {
      if (req.file) {
        try {
          const image = {}
          const path = req.file.path
          if (path) {
            const { secure_url } = await cloudinary.uploader.upload(path)
            image.url = secure_url
          }
          await PartnerCompanyModel.findOneAndUpdate({ cnpj }, {image:image.url}, { new: false })
          resp.status(201).json({ success: "Empresa parceira criada com sucesso!" })
        } catch (err) {
          console.log(err)
          await PartnerCompanyModel.findOneAndDelete({ cnpj }, {image:image.url}, { new: false })
          resp.status(500).json({ error: "Ocorreu um erro inesperado ao inserir a imagem da empresa" })
        }
      }else{
        resp.status(201).json({ success: "Empresa parceira criada com sucesso!" })
      }
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.showPartnerCompany = async (req, resp) => {
  const { id } = req.params
  try {
    const partnerCompany = await PartnerCompanyModel.findById(id).select(['_id', 'name', 'cnpj', 'coupons'])
    if (partnerCompany) {
      resp.status(200).json(partnerCompany)
      return
    } else {
      resp.status(400).json({ error: "Empresa não encontrada" })
      return
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

controller.listPartnerCompanies = async (req, resp) => {
  try {
    const partnerCompanies = await PartnerCompanyModel.find().select(['_id', 'name', 'cnpj'])
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
  const { name, cnpj, coupons } = req.body

  const { error } = companyValidator.updateValidation({ name, cnpj, coupons })
  if (error) {
    const errorMessage = { error: error.details[0].message }
    resp.status(400).json(errorMessage)
    return
  }
  const data = { name, cnpj }

  if (coupons) {
    const couponsIds = await Promise.all(coupons.map(async (coupon) => {
      const { _id } = await CouponModel.create(coupon)
      return _id
    }))
    data.coupons = couponsIds
  }

  try {
    const partnerCompany = await PartnerCompanyModel.findByIdAndUpdate(id, data, { new: false })
    if (partnerCompany) {
      resp.status(200).json({ success: "Empresa atualizada com sucesso" })
    } else {
      resp.status(400).json({ error: 'Empresa não encontrada' })
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
      return
    } else {
      resp.status(400).json({ error: "Empresa não encontrada" })
      return
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: "Ocorreu um erro inesperado" })
  }
}

module.exports = controller
