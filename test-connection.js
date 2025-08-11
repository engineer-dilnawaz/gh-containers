import "dotenv/config";
import { MongoClient } from "mongodb";

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `${connectionProtocol}://${encodeURIComponent(
  dbUser
)}:${encodeURIComponent(
  dbPassword
)}@${clusterAddress}/?retryWrites=true&w=majority`;

console.log(
  "Final URI (hidden password):",
  uri.replace(encodeURIComponent(dbPassword), "****")
);

try {
  const client = new MongoClient(uri);
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log("✅ Connected successfully to server");
  await client.close();
} catch (error) {
  console.error("❌ Connection failed:", error);
}
