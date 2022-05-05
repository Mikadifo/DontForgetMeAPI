const express = require("express");
const users = require("./users");

const recordRoutes = express.Router();

recordRoutes.route("/").get((req, res) => {
  res.status(204).send("Welcome to Don't Forget Me API");
});

recordRoutes.route("/login").post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await users.login(username, password);
  res.status(200).json(result);
});

recordRoutes.route("/users").get(async (req, res) => {
  const result = await users.getUsers();
  res.status(200).json(result);
});

recordRoutes.route("/user/create").post(async (req, res) => {
  const result = await users.createAccount(req.body);
  res.status(201).json(result);
});

recordRoutes.route("/user/:email").get(async (req, res) => {
  const email = req.params.email;
  const result = await users.getUserByEmail(email);
  res.status(200).json(result);
});

recordRoutes.route("/user/by/personal_info").get(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const result = await users.getUserByPersonalInfo(username, email, phone);
  res.status(200).json(result);
});

recordRoutes.route("/user/update/:email").put(async (req, res) => {
  const email = req.params.email;
  const result = await users.update(email, req.body);
  res.status(200).json(result);
});

recordRoutes.route("/user/delete/:email").delete(async (req, res) => {
  const email = req.params.email;
  const result = await users.deleteUser(email);
  res.status(200).json(result);
});

module.exports = recordRoutes;
