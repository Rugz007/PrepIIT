const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
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
    console.log("No Token");
  }
}

module.exports = userAuth;
