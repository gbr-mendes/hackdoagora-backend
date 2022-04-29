const controller = {}
const EcoPontoModel = require("../models/EcoPonto")

controller.createEcoPonto = async (req, res) => {
    const {name, local, description, item} = req.body 
    const data = {name, local, description, item}
    const {error} = authValidator.registerValidation(data)
    if(error){
        const errorMessage = {error: error.details[0].message}
        res.status(400).json(errorMessage)
        return
    }
    const exists = await EcoPontoModel.findOne({name})
    if(exists){
        res.status(400).json({error: "Já existe um EcoPonto com este nome"})
        return
    }
  }

  controller.getEcoPonto = async (req, res) => {
    const {name} = req.body 
    const data = {name}
    const {error} = authValidator.registerValidation(data)
    if(error){
        const errorMessage = {error: error.details[0].message}
        res.status(400).json(errorMessage)
        return
    }
    const exists = await EcoPontoModel.findOne({name})
    if(!exists){
        res.status(400).json({error: "EcoPonto não encontrado"})
        return
    }
  }

  controller.getEcoPontos = async (req, res) => {
    const ecoPontosList = await EcoPontoModel.findAll()
    try{
      res.status(200).json({
        result: ecoPontosList
      })
    }catch(error) {
      res.status(400).json({
        error,
      });
    }
    
  }