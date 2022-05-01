// app initial setup
const express = require("express")
const app = express()
const port = 3000
require('dotenv').config()

// dependencies import
const bodyParser = require("body-parser")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// routes import
const authRoutes = require("./routes/auth")
const dumpRoutes = require("./routes/dump")
const partnerCompaniesRoutes = require("./routes/partnerCompany")
const extractRoutes = require("./routes/extract")
const checkoutRoutes = require("./routes/checkout")
const couponsRoutes = require("./routes/coupons")

// general middlewares
app.use(bodyParser.json())
app.use(cors())

// test routes
app.get("/", (req, resp)=> { // route to test deploye
    resp.json({success: "Application deployed"})
})

// Routes middleware
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/api/auth", authRoutes)
app.use("/api/system", dumpRoutes)
app.use("/api/extract", extractRoutes)
app.use("/api/companies", partnerCompaniesRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/coupons", couponsRoutes)

// Db connection
const db = require("./models/db")
const next = () => {
    // Next is executed after db connection
    return app.listen(process.env.PORT || port, ()=> console.log(`Server listining at port ${port}...`))
}
db._connect(next)
