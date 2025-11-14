const blogusers = require("../models/usermodel")
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {

    const { username, email, password } = req.body
    console.log(username, email, password)

    try {
        const existinguser = await blogusers.findOne({ email })
        if (existinguser) {
            res.status(400).json('User Already exist')
        }
        else {
            const newuser = new blogusers({
                username, email, password
            })
            await newuser.save()
            res.status(200).json(newuser)
        }

    } catch (error) {
        res.status(500).json(error)
    }


}

exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const existinguser = await blogusers.findOne({ email })
        if (existinguser) {
            if (existinguser.password == password) {
                const token = jwt.sign({ userMail: existinguser.email }, 'secretkey')
                res.status(200).json({ existinguser, token })
            }

        }
        else {
            res.status(404).json("incorrect email or password")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}