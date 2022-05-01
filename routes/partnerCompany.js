const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares/validationMiddlewares")
const authValidator = require("../validators/auth")
const partnerCompayController = require("../controllers/partnerCompany")
const upload = require("../utils/multer")

router.delete("/:id", authValidator.verifyTokenMiddleware, middlewares.checkIfAdmin, partnerCompayController.deletePartnerCompany)
router.post ("/register", authValidator.verifyTokenMiddleware, middlewares.checkIfAdmin,upload.single("image"), partnerCompayController.createPartnerCompany)
router.patch ("/:id", authValidator.verifyTokenMiddleware, middlewares.checkAdminFieldOnUserCreation, partnerCompayController.updatePartnerCompany)
router.get ("/:id", partnerCompayController.showPartnerCompany)
router.get ("/", partnerCompayController.listPartnerCompanies)

module.exports = router 