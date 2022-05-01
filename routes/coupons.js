const express = require("express")
const router = express.Router()
const couponsController = require("../controllers/coupons")


router.get("/", couponsController.listcoupons)

module.exports = router