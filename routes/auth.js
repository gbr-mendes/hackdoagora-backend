const express = require("express")
const authValidator = require("../validators/auth")
const router = express.Router()
const authController = require("../controllers/auth")
const checkAdminFieldOnUserCreation = require("../middlewares/validationMiddlewares").checkAdminFieldOnUserCreation
const upload = require("../utils/multer")

router.post("/register",checkAdminFieldOnUserCreation, authController.createUser)
router.post("/login", authController.loginUser)
router.patch("/me",checkAdminFieldOnUserCreation, authValidator.verifyTokenMiddleware, upload.single("image"), authController.updateUser)
router.get("/me",authValidator.verifyTokenMiddleware, authController.userProfile)

module.exports = router