const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    profile:{
        type:String,
        default:""
    }

})

const amazonusers = mongoose.model("amazonusers", userSchema)
module.exports = amazonusers
