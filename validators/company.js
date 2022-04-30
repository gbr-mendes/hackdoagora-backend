const Joi = require("joi")
const { cnpj } = require("cpf-cnpj-validator")


const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required()
            .messages({
                'any.required': `O campo nome é obrigatório`
            }),

        cnpj: Joi.custom((value, helpers) => {
            if (!cnpj.isValid(value)) {
                return helpers.error("any.invalid")
            }
            return value
        })
            .required()

            .messages({
                'any.required': `O campo CNPJ é obrigatório`,
                'any.invalid': `Informe um CNPJ válido`
            })

    })
    return schema.validate(data)
}

module.exports = { registerValidation }
