const controller = {}
const jwt = require("jsonwebtoken")
const UserModel = require("../models/User")
const ExtractModel = require("../models/Extract")
const discardsFormater = require("../utils/hellperFunctions").discardsFormater

controller.extract = async (req, resp) => {
    // #swagger.tags = ['Extract']
    // #swagger.description = 'Endpoint para recuperação de descartes realizados pelo usuário. Requer autenticação'
    const token = req.header("auth-token")
    const {email} = jwt.verify(token, process.env.TOKEN_SECRET)
    const {extract} = await UserModel.findOne({email})
    const {discards} = await ExtractModel.findById(extract)
    resp.json(await discardsFormater(discards))
}

module.exports = controller