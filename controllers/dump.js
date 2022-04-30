const controller = {}
const DumpModel = require("../models/Dump")
const AddresModel = require("../models/Address")
const RecyclableModel = require("../models/Recyclable")
const addressValidator = require("../validators/address")
const dumpValidator = require("../validators/dump")
const CapacityModel = require("../models/Capacity")
const ordererDumpHelper = require("../utils/hellperFunctions").orderDumpsByRegion

controller.createDump = async (req, resp) => {
    const {address} = req.body
    const {name, openingHours, region} = req.body

    if(!name){
        resp.status(400).json({error: "Você precisa informar o nome do estabelecimento"})
        return
    }

    if(!openingHours){
        resp.status(400).json({error: "Você precisa informar um horário de funcionamento"})
        return
    }

    if(!region){
        resp.status(400).json({error: "Você precisa informar a região da lixeira"})
        return
    }
    
    if(!address){
        resp.status(400).json({error: "Você precisa informar um endereço"})
    }
    const {addressError} = addressValidator.createAddresValidation(address)
    if(addressError){
        resp.status(400).json({error: addressError.details[0].message})
    }

    const {dumpError} = dumpValidator.createDumpValidation({name, openingHours, region})
    if(dumpError){
        resp.status(400).json({error: dumpError.details[0].message})
    }
    try{
        const {_id} = await AddresModel.create(address)
        const recyclables = await RecyclableModel.find()
        
        const capacities = await Promise.all(recyclables.map(async recyclable=>{
            const capacity = await CapacityModel.create({address: _id, recyclable: recyclable._id})
            return capacity._id
        }))

        const dumpData = {name, openingHours, address: _id, capacities, region}
        const dump = await DumpModel.create(dumpData)
        resp.status(201).json({success: "Lixeira criada com sucesso", dump})
        return
    }catch(err){
        console.log(err)
        resp.status(500).json({error: "Ocorreu um erro inesperado"})
        return 
    }
}

controller.retriveDumps = async (req, resp) => {
    const dumps = await DumpModel.find()
    const queryset = await Promise.all(
        dumps.map(async dump => {
            const address = await AddresModel.findById(dump.address).select(["-_id", "street", "state", "city", "zipcode"])
            const {name, openingHours, region} =  dump
            return {name, openingHours,region, address} 
        })
        )
    resp.status(200).json(ordererDumpHelper(queryset))
}

controller.filterByCep = async (req, resp) => {
    const zipcode = req.params.cep
    const addresses = await AddresModel.find({zipcode})
    const queryset = await Promise.all(
        addresses.map(async (address)=> {
            const addressInfo = await AddresModel.findById(address._id).select(["-_id", "street", "state", "city", "zipcode"])
            const {name, region, openingHours} = await DumpModel.findOne({address: address._id})
            return {name, region, openingHours, address: addressInfo}
        })
    )
    
    resp.json(queryset)
}

module.exports = controller
