const express = require("express")
const router = express.Router()
<<<<<<< HEAD
const authValidator = require("../validators/auth")
const couponsController = require("../controllers/coupons")


router.get("/", authValidator.verifyTokenMiddleware, couponsController.listcoupons)
=======
const controller = require("../controllers/coupon")

router.get("/", controller.listCoupons)
>>>>>>> gabriel

module.exports = router