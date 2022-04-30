const controller = {}
const DumpModel = require("../models/Dump")
const AddresModel = require("../models/Address")
const RecyclableModel = require("../models/Recyclable")
const addressValidator = require("../validators/address")
const CapacityModel = require("../models/Capacity")

controller.createDump = async (req, resp) => {
    const {address} = req.body
    if(!address){
        resp.status(400).json({error: "Você precisa informar um endereço"})
    }
    const {error} = addressValidator.createAddresValidation(address)
    if(error){
        resp.status(400).json({error: error.details[0].message})
    }
    try{
        const {_id} = await AddresModel.create(address)
        const recyclables = await RecyclableModel.find()
        
        const capacities = await Promise.all(recyclables.map(async recyclable=>{
            const capacity = await CapacityModel.create({address: _id, recyclable: recyclable._id})
            return capacity._id
        }))

        const dumpData = {address: _id, capacities}
        const dump = await DumpModel.create(dumpData)
        resp.status(201).json({success: "Lixeira criada com sucesso", dump})
        return
    }catch(err){
        console.log(err)
        resp.status(500).json({error: "Ocorreu um erro inesperado"})
        return
    }
}

module.exports = controller
