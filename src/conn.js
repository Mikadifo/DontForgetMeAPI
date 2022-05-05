const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.DB_URL;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToDb: (callback) => {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("DFM");
      console.log("Connected to DB");

      return callback();
    });
  },

  getDb: () => {
    return dbConnection;
  },
};
