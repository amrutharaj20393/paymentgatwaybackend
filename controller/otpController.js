
const nodemailer = require("nodemailer");
const amazonusers = require("../models/amazonuserModel")
const dotenv = require('dotenv')
dotenv.config()
const { Resend } = require("resend");
exports.otpamazonController = async (req, res) => {
  //console.log("hau")
  //  const email = req.query.email

  // const { email } = req.body;
  // const existinguser = await amazonusers.findOne({ email })
  // console.log(existinguser)
  // if (existinguser) {
  //   const otp = Math.floor(100000 + Math.random() * 900000);

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.MAIL_USER,
  //       pass: process.env.MAIL_PASS,
  //     },
  //   });

  //   await transporter.sendMail({
  //     from: "amrutharaj20393@gmail.com",
  //     to: email,
  //     subject: "Your OTP Code",
  //     text: `Your OTP is: ${otp}`,
  //   });

  //   res.json({ success: true, otp });
  // }

  // else {
  //   res.status(404).json("incorrect email or password")
  // }

  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, message: "OTP sent", otp });
  } catch (error) {
    res.status(500).json(error);
  }

}