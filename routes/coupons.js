const express = require("express")
const router = express.Router()
const controller = require("../controllers/coupon")

router.get("/:companyName", controller.filterCouponsByCompany)
router.get("/", controller.listCoupons)

module.exports = router