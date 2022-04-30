const router = require("express").Router()
const controller = require("../controllers/dump")

router.post("/dump", controller.createDump) // Add authentication
router.get("/dump/:cep", controller.filterByCep)
router.get("/dump", controller.retriveDumps)

module.exports = router
