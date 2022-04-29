const express = require("express")
const router = express.Router()
const ecoPontoController = require("../controllers/ecoPonto")

router.post("/cadastro", ecoPontoController.createEcoPonto)
router.post("/detalhes", ecoPontoController.getEcoPonto)
router.post("/lista", ecoPontoController.getEcoPontos)

module.exports = router