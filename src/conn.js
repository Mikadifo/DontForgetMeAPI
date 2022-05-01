require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const MONGO_URL = process.env.DB_URL;
const client = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: async (callback) => {
    client.connect((error, db) => {
      if (error || !db) return callback(error);

      dbConnection = db.db("DFM");
      console.log("Conected to DB");

      return callback;
    });
  },
  getDB: () => {
    return dbConnection;
  },
};
