const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./conn");

const app = express();
let serverlessInstance;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./routes"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error!");
});

const setup = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db = await connectDB();
  serverlessInstance = serverless(app);

  return serverlessInstance(event, context);
};

const handler = (event, context) => {
  if (serverlessInstance) return serverlessInstance(event, context);

  return setup(event, context);
};

module.exports.handler = handler;
