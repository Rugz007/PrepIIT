var jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, resp) => {
      if (err) {
        res.status(403).json({ error: "Forbidden" });
      } else {
        if (resp.admin) {
          next();
        } else {
          res.status(403).json({ error: "Forbidden" });
        }
      }
    });
  } else {
    res.status(404).json({ error: "No Token Found" });
  }
}

module.exports = adminAuth;
