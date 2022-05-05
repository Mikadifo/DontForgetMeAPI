const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./conn");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./routes"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error!");
});

dbConfig.connectToDb((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT: ${process.env.PORT}`);
  });
});
