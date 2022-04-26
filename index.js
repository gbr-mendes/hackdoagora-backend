const express = require("express")
const app = express()
const port = 3000
const authRoutes = require("./routes/auth")

require('dotenv').config()

app.get("/", (req, resp)=> {
    resp.json({success: "Application deployed"})
})

// Routes middleware
app.use("/api/auth", authRoutes)

const db = require("./models/db")
const next = () => {
    // Next is executed after db connection
    return app.listen(process.env.PORT || port, ()=> console.log(`Server listining at port ${port}...`))
}
db._connect(next)
