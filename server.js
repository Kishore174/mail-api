const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());

app.post("/register", async (req, res) => {

  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
  });

 const mailOptions = {
  from: "malainormal24@gmail.com",
  to: email,
  subject: "Welcome to Our Platform 🎉",
  html: `
  <div style="font-family:Arial,sans-serif;background:#f4f6fb;padding:30px">

    <div style="max-width:500px;margin:auto;background:white;padding:30px;border-radius:10px;box-shadow:0 5px 15px rgba(0,0,0,0.1)">

      <h2 style="color:#667eea;text-align:center">
        Welcome ${name}! 🎉
      </h2>

      <p style="font-size:15px;color:#555">
        Thank you for registering with our platform. Your account has been created successfully.
      </p>

      <div style="background:#f7f9ff;padding:15px;border-radius:6px;margin:20px 0">
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
      </div>

      <p style="font-size:14px;color:#555">
        We're excited to have you on board. Start exploring our platform now!
      </p>

      <div style="text-align:center;margin-top:20px">
        <a href="#" style="
            background:#667eea;
            color:white;
            padding:12px 25px;
            text-decoration:none;
            border-radius:6px;
            font-size:14px;
        ">
          Get Started
        </a>
      </div>

      <p style="margin-top:25px;font-size:12px;color:#999;text-align:center">
        © 2026 Your Company. All rights reserved.
      </p>

    </div>

  </div>
  `
};

  await transporter.sendMail(mailOptions);

  res.json({ message: "Email sent successfully" });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});