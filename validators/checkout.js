const Joi = require("joi")

const checkoutValidation = (data) =>{
    const schema = Joi.object({
        orders: Joi.array()
            .min(1)
            .required()
            .messages({ 
                'any.required': `O campo logradouro é obrigatório`
            })
    })
    return schema.validate(data)
}

module.exports = {checkoutValidation}