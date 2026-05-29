import { MongoClient } from "mongodb";

const connectionUrl = "mongodb://localhost:27017";
const dbName = "movie-app";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(connectionUrl);

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
