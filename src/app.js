const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDatabase = require("./conn.js");
const users = require("./users.js");
require("dotenv").config();

const app = express();
let db = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Don't Forget Me API");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await users.login(db, username, password);
  res.json(result);
});

app.post("/user/create", async (req, res) => {
  const result = await users.createAccount(db, req.body);
  res.json(result);
});

app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.getUserByEmail(db, email);
  res.json(result);
});

app.post("/user/by/personal_info", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const result = await users.getUserByPersonalInfo(db, username, email, phone);
  res.json(result);
});

app.put("/user/update/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.update(db, email, req.body);
  res.json(result);
});

app.delete("/user/delete/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.deleteUser(db, email);
  res.json(result);
});

app.get("/users", async (req, res) => {
  const result = await users.getUsers(db);
  res.json(result);
});

let serverlessInstance;

const setup = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db = await connectToDatabase();
  serverlessInstance = serverless(app);

  return serverlessInstance(event, context);
};

const handler = (event, context) => {
  if (serverlessInstance) return serverlessInstance(event, context);

  return setup(event, context);
};

module.exports.handler = handler;
