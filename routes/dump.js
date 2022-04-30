const router = require("express").Router()
const controller = require("../controllers/dump")

router.post("/dump", controller.createDump)

module.exports = router
