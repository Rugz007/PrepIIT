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
    db.query(`INSERT INTO enquiry VALUES ($1,$2,DEFAULT)`, [
      req.body.name,
      req.body.number,
    ])
      .then((resp) => {
        db.query("SELECT * FROM template").then((respo) => {
          console.log(respo.rows[0]);
          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Thank you for reaching out to PrepIIT",
            text: `Hello ${req.body.name}!
            ${respo.rows[0]}
         Yours,
         PrepiiT Team`,
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
        });
      })
      .catch((err) => {
        res.end();
        console.log("DB Error");
      });
  });

module.exports = router;
