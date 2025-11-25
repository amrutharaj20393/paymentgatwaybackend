
const nodemailer = require("nodemailer");
const amazonusers = require("../models/amazonuserModel")
exports.otpamazonController = async (req, res) => {
  //console.log("hau")
  //  const email = req.query.email

  const { email } = req.body;
  const existinguser = await amazonusers.findOne({ email })
  console.log(existinguser)
  if (existinguser) {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amrutharaj20393@gmail.com",
        pass: "mvdf mbyr vvdi mrpo",
      },
    });

    await transporter.sendMail({
      from: "amrutharaj20393@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, otp });
  }

  else {
    res.status(404).json("incorrect email or password")
  }
}