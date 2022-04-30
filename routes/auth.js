const express = require("express")
const authValidator = require("../validators/auth")
const router = express.Router()
const authController = require("../controllers/auth")
const middlewares = require("../middlewares/validationMiddlewares")
const upload = require("../utils/multer")

router.post("/register",middlewares.checkAdminFieldOnUserCreation, authController.createUser)
router.post("/login", authController.loginUser)
router.patch("/me",middlewares.checkAdminFieldOnUserCreation, authValidator.verifyTokenMiddleware, upload.single("image"), authController.updateUser)
router.get("/me",authValidator.verifyTokenMiddleware, authController.userProfile)

module.exports = router