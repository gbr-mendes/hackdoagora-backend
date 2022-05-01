const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']


const doc = {
    info: {
        version: "1.0.0",
        title: "API- Troca Inteligente",
        description: "Essa documentação descreve todas a rotas implementadas para o projeto Troca Inteligente, desenvolvido para o evento Provi HackDoAgora"
    },
    host: process.env.HOST || "hackdoagora-backend.herokuapp.com",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json', 'multipart/form-data'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Enpoints para login, registro, informações da conta e ataulização de usuários."
        },
        {
            "name": "Partners",
            "description": "Endpoints para criação, atualização, deleção e recuperação de informações de empresas parceiras"
        },
        {
            "name": "Coupon",
            "description": "Endpoint para listagem de cupons" 
        },
        {
            "name": "Dump",
            "description": "Enpoints para criação listagem e filtragem de lixeiras inteligentes" 
        },
        {
            "name": "Checkout",
            "description": "Enpoint para realização de troca de pontos por cupons"
        },
        {
            "name": "Extract",
            "description": "Enpoint para vizualização de extrato"
        }
    ],
    definitions: {
        ordersObject: {
            orders: [
                {
                    coupon: "Id do cupom",
                    quantity: 2
                }
            ]
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)