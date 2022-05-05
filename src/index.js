const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./conn");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./routes"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error!");
});

app.listen(process.env.PORT, async () => {
  await connectDb();
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
