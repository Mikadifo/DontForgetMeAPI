require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const MONGO_URI = process.env.DB_URL;
let cachedDB = null;

module.exports = async () => {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await MongoClient.connect(MONGO_URI);
  const db = await client.db("DFM");
  cachedDB = db;
  return db;
};
