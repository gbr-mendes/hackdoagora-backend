const express = require("express")
const authValidator = require("../validators/auth")
const router = express.Router()
const authController = require("../controllers/auth")

router.post("/register", authController.createUser)
router.post("/login", authController.loginUser)
router.get("/me",authValidator.verifyTokenMiddleware, authController.userProfile)

module.exports = router