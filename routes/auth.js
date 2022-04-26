const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

router.post("/register", authController.createUser)
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)

module.exports = router