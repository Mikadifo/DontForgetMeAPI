const jwt = require("jsonwebtoken");
require("dotenv").config();

const TOKEN = process.env.TOKEN_SECRET;

const generateAccessToken = (username) => {
  return jwt.sign(username, TOKEN, { expiresIn: "1800s" }); //TODO: Change time to 10 days or +
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
