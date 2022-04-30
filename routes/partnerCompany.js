const express = require("express")
const router = express.Router()
const middlewares = require("../middlewares/validationMiddlewares")
const authValidator = require("../validators/auth")

module.exports = router