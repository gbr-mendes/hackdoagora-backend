const controller = {}
const jwt = require("jsonwebtoken")
const CouponModel = require("../models/Coupon")
const UserModel = require("../models/User")
const checkoutValidator = require("../validators/checkout").checkoutValidation

controller.checkout = async (req, resp) => {
    const token = req.header('auth-token')
    const {email} = jwt.verify(token, process.env.TOKEN_SECRET)
    const {orders} = req.body
    
    if(!orders){
        resp.status(400).json({error: "Você precisa informar ao menos um pedido"})
        return
    }
    const {error} = checkoutValidator({orders})
    if(error){
        const errorMessage = {error: error.details[0].message}
        resp.status(400).json(errorMessage)
        return
    }

    const orderTotal = await orders.reduce(async (total, order)=>{
        const {value} = await CouponModel.findById(order.coupon)
        return await total + value * order.quantity
    }, 0)
    
    const user = await UserModel.findOne({email})
    const {score} = user
    if(score < orderTotal){
        resp.status(400).json({error: 'Você não tem pontos o suficiente'})
    }else{
        try{
            const data = {score: score - orderTotal}
            await UserModel.findOneAndUpdate({email}, data)
            resp.status(200).json({success: "Resgate realizado com sucesso"})
        }catch(err){
            resp.status(500).json({error: "Ocorreu um erro inesperado no resgate do Voucher"})
        }
    }
}

module.exports = controller