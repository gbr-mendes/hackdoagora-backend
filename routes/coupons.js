const express = require("express")
const router = express.Router()
const authValidator = require("../validators/auth")
const couponsController = require("../controllers/coupons")


router.get("/", authValidator.verifyTokenMiddleware, couponsController.listcoupons)

module.exports = router