var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

router
    .get("/", (req, res, next) => {
    res.json({ message: "send a POST request" });
})
    .post("/", (req, res, next) => {
    
    })

module.exports = router;