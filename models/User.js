const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    profileImage: {
        type: String,
        default: ""
    },
    score: {
        type: Number,
        default: 0,
    },
    amountDescatarded: {
        type: Number,
        default: 0
    },
    extract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Extract"
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

module.exports = mongoose.model("User", userSchema)