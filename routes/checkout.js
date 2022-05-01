const express = require("express")
const router = express.Router()
const controller = require("../controllers/checkout")
const checkAuth = require("../validators/auth").verifyTokenMiddleware

router.post("/", checkAuth, controller.checkout)

module.exports = router