const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares/validationMiddlewares")
const authValidator = require("../validators/auth")
const partnerCompayController = require("../controllers/partnerCompany")

router.delete("/:id", middlewares.verifyTokenMiddleware, middlewares.checkIfAdmin, partnerCompayController.deletePartnerCompany)
router.post ("/register", authValidator.verifyTokenMiddleware, middlewares.checkIfAdmin, partnerCompayController.createPartnerCompany)
router.patch ("/:id", authValidator.verifyTokenMiddleware, middlewares.checkAdminFieldOnUserCreation, partnerCompayController.updatePartnerCompany)
router.get ("/:id", partnerCompayController.showPartnerCompany)
router.get ("/", partnerCompayController.listPartnerCompanies)

module.exports = router 