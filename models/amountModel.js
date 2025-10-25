const mongoose = require('mongoose')
const amountSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }

})






const amount = mongoose.model("users", amountSchema)
module.exports = amount