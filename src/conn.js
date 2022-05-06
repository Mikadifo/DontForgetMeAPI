const MongoClient = require("mongodb").MongoClient;
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongoUri = process.env.DB_URL;
let dbConnection;

module.exports = async () => {
  if (dbConnection) {
    return dbConnection;
  }

  if (process.env.NODE_ENV === "test") {
    dbConnection = await MongoMemoryServer.create();
    mongoUri = dbConnection.getUri();
  }

  const client = await MongoClient.connect(mongoUri);
  const db = client.db("DFM");
  dbConnection = db;

  return db;
};
