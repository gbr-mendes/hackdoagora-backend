const express = require("express")
const app = express()
const port = 3000

require('dotenv').config()

app.get("/", (req, resp)=> {
    resp.json({success: "Application deployed"})
})

const db = require("./models/db")
const next = () => {
    // Next is executed after db connection
    return app.listen(process.env.PORT || port, ()=> console.log(`Server listining at port ${port}...`))
}
db._connect(next)
