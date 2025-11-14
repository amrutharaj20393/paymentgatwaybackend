const blogs = require("../models/blogmodel")


exports.addBlogController = async (req, res) => {

    console.log(req.body)
    console.log(req.file)
    const { title, description, category } = req.body
    let imageurl = ""
    imageurl = req.file.filename
    let email = req.payload
    console.log(email)
    try {


        const newBlog = new blogs({
            title, description, category, imageurl, email
        })
        await newBlog.save()
        res.status(200).json(newBlog)


    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getHomeBlogContoller = async (req, res) => {
    //console.log("hai")
    try {
        const allblogs = await blogs.find().sort({ _id: -1 })
        res.status(200).json(allblogs)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUserBlogContoller = async (req, res) => {
   // console.log("hai")
    let email = req.payload
    try {
        const allblogs = await blogs.find({ email })
        res.status(200).json(allblogs)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateBlogController = async (req, res) => {
console.log("hai")
    console.log(req.body)
    //console.log(req.file)
    const { _id, title, description, category,imageurl } = req.body
    console.log(_id, title, description, category,imageurl)
    //let imageurl = ""
     const prof = req.file ? req.file.filename : imageurl
    //imageurl = req.file.filename
    let email = req.payload
    console.log(prof)
     try {

        const updateBlog = await blogs.findByIdAndUpdate( _id , {
            title, description, category,imageurl:prof,email
        },
     { new: true })

        //await updateBlog.save()
        res.status(200).json(updateBlog)
    } catch (error) {
        res.status(500).json(error)
    }
}
//6915fa92afb6226e907eac2f

exports.deleteController = async (req, res) => {
    console.log("haiii")
    const { id } = req.params
    try {

        await blogs.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted')
    }
    catch (error) {
        res.status(500).jsone(error)
    }
}
