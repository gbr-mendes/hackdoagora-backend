const controller = {}
const DumpModel = require("../models/Dump")
const AddresModel = require("../models/Address")
const RecyclableModel = require("../models/Recyclable")
const addressValidator = require("../validators/address")
const dumpValidator = require("../validators/dump")
const CapacityModel = require("../models/Capacity")
const ordererDumpHelper = require("../utils/hellperFunctions").orderDumpsByRegion

controller.createDump = async (req, resp) => {
    // #swagger.tags = ['Dump']
    // #swagger.description = 'Endpoint para criação de lixeiras inteligentes. É necessário estar logado e se um usuário admin. O campo região só aceita os valores Norte, Sul, Leste, Oeste e Centro'
     /*	#swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            region: {
                                type: "string",
                                '@enum': ["Norte", "Sul", "Leste", "Oeste", "Centro"]
                            },
                            openingHours: {
                                type: "string"
                            },
                            address: {
                                type: "object",
                                properties: {
                                    street:{type: "string"},
                                    state:{type: "string"},
                                    city:{type: "string"},
                                    zipcode:{type: "string"},
                                }
                            }
                        },
                    }
                }
            } 
        }
    */
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
    // #swagger.tags = ['Dump']
    // #swagger.description = 'Endpoint para listagem de lixeiras inteligentes. Nenhum privilégio administrativo é requerido'
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
    // #swagger.tags = ['Dump']
    // #swagger.description = 'Endpoint para a filtragem de lixeiras por cep. Nenhum privilégio administrativo é requerido'
    // #swagger.parameters['cep'] = { description: 'CEP de localização de lixeira' }
    const zipcode = req.params.cep
    const addresses = await AddresModel.find({zipcode})
    const queryset = await Promise.all(
        addresses.map(async (address)=> {
            const addressInfo = await AddresModel.findById(address._id).select(["-_id", "street", "state", "city", "zipcode"])
            const {name, region, openingHours} = await DumpModel.findOne({address: address._id})
            return {name, region, openingHours, address: addressInfo}
        })
    )
    resp.status(200).json(queryset)
}

module.exports = controller
