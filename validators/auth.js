const Joi = require("joi")
const jwt = require("jsonwebtoken")

const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required()
            .messages({ 
                'any.required': `O campo nome é obrigatório`
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({ 
                'any.required': `O campo email é obrigatório`
            }),
        password: Joi.string()
            .required()
            .min(8)
            .messages({ 
                'any.required': `O campo senha é obrigatório`
            }),
        confirmPassword: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .messages({ 
                'any.only': 'Senhas não conferem' ,
                'any.required': `Você precisa confirmar sua senha`
            })

    })
    return schema.validate(data)
} 

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({ 
                'any.required': `O campo email é obrigatório`
            }),
        password: Joi.string()
            .required()
            .min(8)
            .messages({ 
                'any.required': `O campo senha é obrigatório`
            })
    })
    return schema.validate(data)
}

const verifyTokenMiddleware = (req, resp, next) =>{
    const token = req.header("auth-token")
    if(!token){
        return resp.status(401).json({error: "Usuário não tem permissão para acessar essa página"})
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        resp.status(400).json({error: "Token Inválido"})
    }
}

module.exports = {registerValidation, loginValidation, verifyTokenMiddleware}