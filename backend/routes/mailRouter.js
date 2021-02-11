var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

const db = require("../db");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

router
  .get("/", (req, res, next) => {
    res.json({ message: "send a POST request" });
  })
  .post("/", (req, res, next) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Thank you for reaching out to PrepIIT",
      text: `Hello ${req.body.name}!
          Thank You for reaching out to PrepIIT, we are excited that you've shown an interest in us and hope yo have a long and fruitful relationship with you. A member of our team will be in touch with you shortly.
       Yours,
       PrepIIT Team`,
    };
    db.query(`INSERT INTO enquiry VALUES ($1,$2,$3,$4,DEFAULT,$5 )`, [
      req.body.name,
      req.body.email,
      req.body.number,
      req.body.standard,
      req.body.type,
    ])
      .then((resp) => {
        res.end();
        console.log("Inserted Successfully");
      })
      .catch((err) => {
        res.end();
        console.log("DB Error");
      });
    transporter
      .sendMail(mailOptions)
      .then((resp) => {
        console.log("Email Sent");
        res.json(resp);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

module.exports = router;
