const jwt = require("jsonwebtoken")
const verifyToken = require("../validators/auth").verifyTokenMiddleware
const UserModel = require("../models/User")

async function checkAdminFieldOnUserCreation(req, resp, next) {
    const {isAdmin} = req.body
    if(isAdmin){
        const token = req.header("auth-token")
        try {
            const {email} = jwt.verify(token, process.env.TOKEN_SECRET)
            const user = await UserModel.findOne({email})
            if(user.isAdmin){
                next()
            }else{
                resp.status(403).json({error: "Permissão Negada"})
            }
        }catch(err) {
            verifyToken(req, resp)
        }
    }else{
        next()
    }
}

async function checkIfAdmin(req, resp, next) {
    const token = req.header('auth-token')
    const {email} = jwt.verify(token, process.env.TOKEN_SECRET)
    const {isAdmin} = await UserModel.findOne({email})
    if(!isAdmin){
        resp.status(403).json({error: "Permissão Negada"})
        return
    }
    next()
}

module.exports = {checkAdminFieldOnUserCreation, checkIfAdmin}