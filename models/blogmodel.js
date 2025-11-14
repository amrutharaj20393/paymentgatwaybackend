const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
         type: String,
        required: true
    },
    category: {
         type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    }
})






const blogs = mongoose.model("blogs", blogSchema)
module.exports = blogs
