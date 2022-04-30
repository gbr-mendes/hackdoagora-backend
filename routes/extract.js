const express = require("express")
const router = express.Router()
const controller = require("../controllers/extract")
const checkAuth = require("../validators/auth")

router.get("/", checkAuth.verifyTokenMiddleware, controller.extract)

module.exports = router