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
    try{
        // const user = await UserModel.create(data)
        const user = {
            _id: "someid",
            name: "Teste Name",
            email: "teste@email.com",
            password: "hashedpassword"
        }
        if(user){
            const token = jwt.sign(user, process.env.TOKEN_SECRET)
            resp.header("auth-token", token)
            resp.status(201).json({success: "User created"})
        }
    }catch(err){
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
    
    // const user = UserModel.findOne({email})
    const user = {id: "someid", name: "teste name", email, password} // it will be replaced for the up comment
    if(!user){
        resp.status(400).json({error: "User with this email not found"})
        return
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    // hashedPassword will gona be replaced by user.password, when models defined
    const validPass = await bcrypt.compare(password, hashedPassword)
    if(!validPass){
        resp.status(400).json({error: "Incorrect password"})
        return
    }
    const token = jwt.sign(user, process.env.TOKEN_SECRET)
    resp.header("auth-token", token)
    resp.status(200).json({success: "User logged in"})
}

controller.logoutUser = async (req, resp) => {
    resp.status(200).json({success: "User logged out"})
}

module.exports = controller