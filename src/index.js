const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./conn.js");
const users = require("./users.js");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.listen(process.env.PORT, async () => {
//await mongo.connectToServer();
//console.log(`Listening on por ${process.env.PORT}`);
//});

app.get("/", (req, res) => {
  res.send("Welcome to Don't Forget Me API");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await users.login(mongo, username, password);
  res.json(result);
});

app.post("/user/create", async (req, res) => {
  const result = await users.createAccount(mongo, req.body);
  res.json(result);
});

app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.getUserByEmail(mongo, email);
  res.json(result);
});

app.post("/user/by/personal_info", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const phone = req.body.phone;
  const result = await users.getUserByPersonalInfo(
    mongo,
    username,
    email,
    phone
  );
  res.json(result);
});

app.put("/user/update/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.update(mongo, email, req.body);
  res.json(result);
});

app.delete("/user/delete/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.deleteUser(mongo, email);
  res.json(result);
});

app.get("/users", async (req, res) => {
  const result = await users.getUsers(mongo);
  res.json(result);
});

module.exports.handler = serverless(app);
