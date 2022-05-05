const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const MONGO_URI = process.env.DB_URL;
let dbConnection;

module.exports = async () => {
  if (dbConnection) {
    return dbConnection;
  }

  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db("DFM");
  dbConnection = db;

  return db;
};
