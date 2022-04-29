// app initial setup
const express = require("express")
const app = express()
const port = 3000
require('dotenv').config()

// dependencies import
const bodyParser = require("body-parser")
const cors = require("cors")
const cloudinary = require("./utils/cloudinary")
const upload = require("./utils/multer")

// routes import
const authRoutes = require("./routes/auth")
const ecoPontoRoutes = require("./routes/ecoPonto")

// general middlewares
app.use(bodyParser.json())
app.use(cors())

// test routes
app.get("/", (req, resp)=> { // route to test deploye
    resp.json({success: "Application deployed"})
})

app.post('/upload', upload.single("image"), async (req, resp) => { // route to test upload images to cloudinary
    try{
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path)
        resp.json(result)

    }catch(err){
        console.log(err)
    }
})

// Routes middleware
app.use("/api/auth", authRoutes)

// Db connection
const db = require("./models/db")
const next = () => {
    // Next is executed after db connection
    return app.listen(process.env.PORT || port, ()=> console.log(`Server listining at port ${port}...`))
}
db._connect(next)
