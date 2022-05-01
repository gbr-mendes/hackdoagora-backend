const controller = {}
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../models/User")
const authValidator = require("../validators/auth")
const generateExtract = require("../utils/hellperFunctions").randonExtract
const setUserScoreAndAmountDiscarded = require("../utils/hellperFunctions").setUserScoreAndAmountDiscarded
const cloudinary = require("../utils/cloudinary")


controller.createUser = async (req, resp) =>{
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para registrar usuário. Para setar isAdmin como true, é necessário estar autenticado e ser um admin'
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
                            email: {
                                type: "string"
                            },
                            cpf: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            },
                            confirmPassword: {
                                type: "string"
                            },
                        },
                    }
                }
            } 
        }
    */
    const {name, email, cpf, password, confirmPassword} = req.body
    const data = {name, email, cpf, password, confirmPassword}
    const {error} = authValidator.registerValidation(data)
    
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }

    const cpfAlreadyRegistered = await UserModel.findOne({cpf})
    if(cpfAlreadyRegistered){
        resp.status(400).json({error: "CPF já cadastrado"})
        return
    }

    const emailAlreadyRegisterd = await UserModel.findOne({email})
    if(emailAlreadyRegisterd){
        resp.status(400).json({error: "Email já cadastrado"})
        return
    }
    const extract = await generateExtract()
    data.extract = extract._id
    try{
        const user = await UserModel.create(data)
        
        if(user){
            const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET)
            await setUserScoreAndAmountDiscarded(user._id, extract)
            resp.header("auth-token", token)
            resp.status(201).json({success: "Usuário criado com sucesso!", token})
        }
    }catch(err){
        console.log(err)
        resp.status(500).json({error: "Ocorreu um erro inesperado"})
    }
}

controller.loginUser = async (req, resp) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para fazer login do usuário. O retorno é um JWT. O campo userCredential aceita tanto email, como CPF'
    /*	#swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            credentialLogin: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }
                        },
                    }
                }
            } 
        }
    */
    const {credentialLogin, password} = req.body
    const data = {credentialLogin, password}
    
    const {error} = authValidator.loginValidation(data)
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }
    
    const user = await UserModel.findOne({$or:[{email: credentialLogin}, {cpf: credentialLogin}]})
    if(!user){
        resp.status(400).json({error: "Usuário ou senha inválidos"})
        return
    }
    
    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass){
        resp.status(400).json({error: "Usuário ou senha inválidos"})
        return
    }
    const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET)
    resp.header("auth-token", token)
    resp.status(200).json({success: "Logado com sucesso!", token})
}

controller.updateUser = async (req, resp) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para atualizar um usuário. Através de formdata também é possível incluir a foto de perfil do usuário'
    /*	#swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            },
                            image: {
                                type: "file",
                            }
                        },
                    }
                }
            } 
        }
    */
    const {error} = authValidator.updateUserValidator(req.body)
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }
    const token = req.header("auth-token")
    const {email} = jwt.verify(token, process.env.TOKEN_SECRET)
    const data = req.body

    if(req.file){
        try{
            const path = req.file.path
            if(path){
                const {secure_url} = await cloudinary.uploader.upload(path)    
                data.profileImage = secure_url
            }
            
            await UserModel.findOneAndUpdate({email}, data, {new: false})
            
            resp.status(200).json({success: "Usuário atualizado com sucesso"})

        }catch(err){
            console.log(err)
            resp.status(500).json({error: "Ocorreu um erro inesperado ao atualizar o usuário"})
        }
    }else{
        try{              
            await UserModel.findOneAndUpdate({email}, data, {new: false})
            resp.status(200).json({success: "Usuário atualizado com sucesso"})
        }catch(err){
            console.log(err)
            resp.status(500).json({error: "Ocorreu um erro inesperado ao atualizar o usuário"})
        }
    }
}

controller.userProfile = async (req, resp) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para obter as informações usuário. Requer autenticação'

    const token = req.header("auth-token")
    const {name, email, cpf, profileImage, score, amountDescatarded} = jwt.verify(token, process.env.TOKEN_SECRET)

    const user = await UserModel.findOne({email})
    if(!user){
        resp.status(400).json({error: "Usuário não encontrado"})
        return
    }

    resp.status(200).json({name, email, cpf, profileImage, score, amountDescatarded})
}

module.exports = controller