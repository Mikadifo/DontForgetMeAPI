const jwt = require("jsonwebtoken");
require("dotenv").config();

const TOKEN = process.env.TOKEN_SECRET;

const generateAccessToken = (username) => {
  return jwt.sign(username, TOKEN, { expiresIn: "10d" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      statusOk: false,
      errorMessagge: "You must provide an auth token",
    });
  }

  jwt.verify(token, TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        statusOk: false,
        errorMessagge: "The token you provided is invalid or expired.",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
