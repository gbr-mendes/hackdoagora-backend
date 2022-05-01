const ExtractModel = require("../models/Extract")
const DiscardModel = require("../models/Discard")
const RecyclableModel = require("../models/Recyclable")
const UserModel = require("../models/User")
const DumpModel = require("../models/Dump")

function orderDumpsByRegion(queryset){
    const orderedQueryset = {norte:[],sul:[], leste:[], oeste:[], centro:[]}
    queryset.map(dump=> {
        switch(dump.region){
            case "Norte":
                orderedQueryset.norte.push(dump)
                break
            case "Sul":
                orderedQueryset.sul.push(dump)
                break
            case "Leste":
                orderedQueryset.leste.push(dump)
                break
            case "Oeste":
                orderedQueryset.oeste.push(dump)
                break
            case "Centro":
                orderedQueryset.centro.push(dump)
                break
        }
    })
    return orderedQueryset
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function randonExtract(){
    const discards = []
    const reciclables = await RecyclableModel.find()
    const dumps = await DumpModel.find()
    const totalItems = getRandomInt(5,11)
    for(let i=0; i< totalItems; i++){
        const dump = dumps[getRandomInt(0, dumps.length)]
        const quantity = getRandomArbitrary(200, 2000).toFixed(2)
        const recyclable = reciclables[getRandomInt(0, reciclables.length)]
        const discard = await DiscardModel.create({recyclable: recyclable._id, quantity, dump: dump._id})
        discards.push(discard._id)
    }
    const extract = await ExtractModel.create({discards})
    return extract
}

async function discardsFormater(discards){
    const discardsFormated = await Promise.all(discards.map(async discard=> {
        const discardInfo = await DiscardModel.findById(discard._id)
        const {dump, recyclable, quantity, date} = discardInfo
        const dumpInfo = await DumpModel.findById(dump).select(["-_id", "name"])
        const {name, value} = await RecyclableModel.findById(recyclable)
        const pointsEarned = Math.ceil(quantity/100*value)
        return {dump:dumpInfo,name, value, date, quantity ,pointsEarned}
    }))
    return discardsFormated
}

async function setUserScoreAndAmountDiscarded(userId, extract){
    const {discards} = await ExtractModel.findById(extract)
    const data = {score: 0, amountDescatarded:0}

    await discards.map(async discard=>{
        const {recyclable, quantity} = await DiscardModel.findById(discard)
        const {value} = await RecyclableModel.findById(recyclable)
        data.score += Math.ceil(quantity/100*value)
        data.amountDescatarded+=quantity
        await UserModel.findByIdAndUpdate(userId, data)
    })
}

module.exports = {orderDumpsByRegion, randonExtract, discardsFormater, setUserScoreAndAmountDiscarded}