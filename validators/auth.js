const Joi = require("joi")
const jwt = require("jsonwebtoken")

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
            .min(8),
        confirmPassword: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .messages({ 'any.only': 'Passwords does not match' })

    })
    return schema.validate(data)
} 

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
            .min(8)
    })
    return schema.validate(data)
}

const verifyTokenMiddleware = (req, resp, next) =>{
    const token = req.header("auth-token")
    if(!token){
        return resp.status(401).json({error: "Permission Denied"})
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        resp.status(400).json({error: "Invalid Token"})
    }
}

module.exports = {registerValidation, loginValidation, verifyTokenMiddleware}