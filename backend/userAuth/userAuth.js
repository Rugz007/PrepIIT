const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  console.log(req.d)
  var token = req.body.token;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, resp) => {
      if (err) {
        res.status(403).json({ error: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(404).json({ error: "No Token Found" });
  }
}

module.exports = userAuth;
