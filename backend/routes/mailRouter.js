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
    db.query(`INSERT INTO enquiry VALUES ($1,$2,$3,$4,DEFAULT,$5 )`, [
      req.body.fullname,
      req.body.email,
      req.body.number,
      req.body.standard,
      req.body.type,
    ])
      .then((resp) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Thank you for reaching out to PrepIIT",
          text: `Hello ${req.body.fullname}!
          Thank You for reaching out to PrepIIT, we are excited that you've shown an interest in us and hope yo have a long and fruitful relationship with you. A member of our team will be in touch with you shortly.
       Yours,
       PrepIIT Team`,
        };
        transporter
          .sendMail(mailOptions)
          .then((respo) => {
            console.log("Email Sent");
            res.end();
          })
          .catch((err) => {
            console.log(err);
            res.end();
          });
        res.end();
        console.log("Inserted Successfully");
      })
      .catch((err) => {
        res.end();
        console.log("DB Error");
      });
  });

module.exports = router;
