const Joi = require("joi")

const createAddresValidation = (data) =>{
    const schema = Joi.object({
        street: Joi.string()
            .min(5)
            .required()
            .messages({ 
                'any.required': `O campo logradouro é obrigatório`
            }),
        state: Joi.string()
        .min(2)
        .required()
        .messages({ 
            'any.required': `O campo estado é obrigatório`
        }),
        city: Joi.string()
            .min(2)
            .required()
            .messages({ 
                'any.required': `O campo cidade é obrigatório`
            }),
        zipcode: Joi.string()
        .min(8)
        .required()
        .messages({ 
            'any.required': `O campo CEP é obrigatório`
        }),
    })
    return schema.validate(data)
}

module.exports = {createAddresValidation}