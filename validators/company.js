const Joi = require("joi")

const { cnpj } = require("cpf-cnpj-validator")

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
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
            }),
        coupons: Joi.array()
            .min(1)
            .required()
            .messages({
                "any.required": "O campo cupons é obrigatório",
                "array.min": "Você precisa adicionar ao menos um cupom"
            })
    })
    return schema.validate(data)
}

const updateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .messages({
                "string.min": "O campo nome precisa de no mínimo 2 caracteres"
            }),
        cnpj: Joi.custom((value, helpers) => {
            if (!cnpj.isValid(value)) {
                return helpers.error("any.invalid")
            }
            return value
        })
            .messages({
                "any.invalid": `Informe um CNPJ válido`
            }),
        coupons: Joi.array()
    })
    return schema.validate(data)
}

module.exports = { registerValidation, updateValidation }
