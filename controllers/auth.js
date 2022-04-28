const controller = {}
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../models/User")
const authValidator = require("../validators/auth")

controller.createUser = async (req, resp) =>{
    const {name, email, password, confirmPassword} = req.body
    const data = {name, email, password, confirmPassword}
    const {error} = authValidator.registerValidation(data)
    
    
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }

    const exists = await UserModel.findOne({email})
    if(exists){
        resp.status(400).json({error: "An user with this email already exists"})
        return
    }

    try{
        const user = await UserModel.create(data)
        
        if(user){
            const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET)
            resp.header("auth-token", token)
            resp.status(201).json({success: "User created", token})
        }
    }catch(err){
        console.log(err)
        resp.status(500).json({error: "An error has occurred"})
    }
}

controller.loginUser = async (req, resp) => {
    const {email, password} = req.body
    const data = {email, password}
    
    const {error} = authValidator.loginValidation(data)
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }
    
    const user = await UserModel.findOne({email})
    if(!user){
        resp.status(400).json({error: "User with this email not found"})
        return
    }
    
    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass){
        resp.status(400).json({error: "Incorrect password"})
        return
    }
    const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET)
    resp.header("auth-token", token)
    resp.status(200).json({success: "User logged in", token})
}

module.exports = controller