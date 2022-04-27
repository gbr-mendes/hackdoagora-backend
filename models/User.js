const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    // need to define the fields...
})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword

    next()
})

module.exports = mongoose.model("User", userSchema)