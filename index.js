const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, resp)=> {
    resp.json({success: "Application deployed"})
})

app.listen(process.env.PORT || port, ()=> `Server listining at port ${port}`)
