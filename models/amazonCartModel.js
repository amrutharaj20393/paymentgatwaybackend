const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
    email:{
         type: String,
        required: true
    },
    quantity:{
         type: Number,
        default: 1
    },
    pid:{
         type: Number,
       required: true
    }

})

const cartlists = mongoose.model("cartlists", cartSchema)
module.exports = cartlists
