var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const db = require("../db");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

router
  .post("/signup", (req, res, resp) => {
    var token = jwt.sign(req.body, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Verification for access to content provided by PrepiiT",
      html: `Hello ${req.body.name}!
          <p>Thank you for showing an interest in PrepiiT</p>
          <p> Click <a href="http://localhost:3000/user/${token}">here</a> to verify yourself on PrepiiT</p>
          <p>Yours,</p>
          <p>PrepiiT Team</p>`,
    };
    transporter
      .sendMail(mailOptions)
      .then((respo) => {
        console.log("Email Sent");
      })
      .catch((err) => {
        console.log(err);
      });
    res.end();
  })
  .post("/login", (req, res, next) => {
    var password = req.body.password;
    var email = req.body.email;
    db.query(`SELECT * FROM users WHERE email=$1`, [email]).then((resp) => {
      if (resp.rows.length > 0) {
        if (password === resp.rows[0].password) {
          var token = jwt.sign(resp.rows[0], process.env.SECRET_KEY, {
            expiresIn: "365d",
          });
          var currenttestid = resp.rows[0].currenttestid;
          res.status(200).json({
            success: true,
            token: token,
            user: resp.rows[0],
            currenttestid: currenttestid,
          });
        } else {
          res.status(403).json({
            success: false,
            errmess: "Email and Password don't match",
          });
        }
      } else {
        res
          .status(403)
          .json({ success: false, errmess: "Email is not registered" });
      }
    });
  })
  .get("/:token", (req, res, next) => {
    var token = req.params.token;
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, resp) => {
        if (err) {
          res.status(403).json({ error: "Invalid Token" });
        } else {
          console.log(resp);
          db.query(
            `INSERT INTO users VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,NULL)`,
            [
              resp.name,
              resp.password,
              resp.email,
              resp.admin,
              resp.phone_no,
              resp.address,
              resp.standard,
            ]
          )
            .then((resp) => {
              res.redirect("http://localhost:3002");
            })
            .catch((err) => {
              if (err.detail === `Key (email)=(${email}) already exists.`) {
                res
                  .status(400)
                  .json({ success: false, errmess: "Email is already taken" });
              } else {
                res.status(400).json({ success: false, errmess: err });
              }
            });
        }
      });
    } else {
      res.status(404).json({ error: "No Token Found" });
      console.log("No Token");
    }
  })
  .post("/forgotpassword", (req, res, next) => {
    const tempPassword = randomstring.generate({ length: 15 });
    db.query("SELECT * from users WHERE email=$1", [req.body.email])
      .then((resp) => {
        if (resp.rows.length > 0) {
          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Temporary password to access your PrepiiT Account",
            html: `Hello ${resp.rows[0].name}!
          <p>This mail is in response to a request you've sent to reset your password</p>
          <p>Your new password is ${tempPassword}</p>
          <p>Yours,</p>
          <p>PrepiiT Team</p>`,
          };
          db.query("UPDATE users SET password=$1 WHERE email=$2", [
            tempPassword,
            req.body.email,
          ])
            .then((respo) => {
              transporter
                .sendMail(mailOptions)
                .then((respon) => {
                  console.log("Email Sent");
                  res.end();
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ err: "Mail not sent" });
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ err: "DB Error" });
            });
        } else {
          res.status(404).json({ err: "No such email is registered" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "DB Error" });
      });
  });
module.exports = router;
