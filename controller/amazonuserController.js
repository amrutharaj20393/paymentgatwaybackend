const amazonusers = require("../models/amazonuserModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerController = async (req, res) => {

    const { username, email, password } = req.body
    console.log(username, email, password)

    try {
        const existinguser = await amazonusers.findOne({ email })
        if (existinguser) {
            res.status(400).json('User Already exist')
        }
        else {
            const hashedpswd = await bcrypt.hash(password, 10)
            console.log(hashedpswd)
            const newuser = new amazonusers({
                username, email, password:hashedpswd
            })
            await newuser.save()
            res.status(200).json(newuser)
        }

    } catch (error) {
        res.status(500).json(error)
    }


}

exports.googleLoginController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password)
    try {

        const existinguser = await amazonusers.findOne({ email })
        if (existinguser) {
            //token creation
            const token = jwt.sign({ userMail: existinguser.email }, 'secretkey')
            res.status(200).json({ existinguser, token })


        }
        else {

            //register new user for google login user
            const newuser = new amazonusers({
                username, email, password
            })
            await newuser.save()
            const token = jwt.sign({ userMail: newuser.email }, 'secretkey')
            await newuser.save()
            res.status(200).json({ existinguser: newuser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.loginController = async (req, res) => {
    const { email } = req.query;
   console.log(email)
    try {
        const existinguser = await amazonusers.findOne({ email })
        console.log(existinguser)
         
        if (existinguser) {
            //  const existingPassword = await bcrypt.compare(password, existinguser.password)
            // console.log(existingPassword)
            // if (existingPassword == true) {
            //     const token = jwt.sign({ userMail: existinguser.email }, 'secretkey')
                res.status(200).json({ existinguser })
            //}

        }
        else {
            res.status(404).json("incorrect email or password")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

exports.loginpasswordController = async (req, res) => {
    const { email,password } = req.body;
   console.log( email,password)
    try {
        const existinguser = await amazonusers.findOne({ email })
        console.log(existinguser)
         
        if (existinguser) {
              const existingPassword = await bcrypt.compare(password, existinguser.password)
             console.log(existingPassword)
             if (existingPassword == true) {
                const token = jwt.sign({ userMail: existinguser.email }, 'secretkey')
                res.status(200).json({ existinguser ,token})
            }

        }
        else {
            res.status(404).json("incorrect email or password")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}