var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const db = require("../db");

router
  .post("/signup", (req, res, resp) => {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var admin = req.body.admin;
    var phone_no = req.body.phone_no;
    var address = req.body.address;
    var standard = req.body.class;
    db.query(`INSERT INTO users VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7)`, [
      name,
      password,
      email,
      admin,
      phone_no,
      address,
      standard,
    ])
      .then((resp) => {
        res.status(201).json({ success: true, res: resp });
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
          res
            .status(200)
            .json({ success: true, token: token, user: resp.rows[0] });
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
  });
module.exports = router;
