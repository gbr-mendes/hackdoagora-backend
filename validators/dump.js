const Joi = require("joi")

const createDumpValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .required()
            .messages({ 
                'any.required': `Você precisa informar o nome do estabelecimento`
            }),
        openingHours: Joi.string()
        .min(5)
        .required()
        .messages({ 
            'any.required': `Você precisa informar o horário de funcionamento`
        })
    })
    return schema.validate(data)
}

module.exports = {createDumpValidation}