import clientPromise from "./db";
import { ObjectId } from "mongodb";

export async function getAllResources() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection("resources").find({}).toArray();
}

export async function addResource(data: any) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection("resources").insertOne(data);
}

export async function updateResource(id: string, data: any) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection("resources").updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function deleteResource(id: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection("resources").deleteOne({ _id: new ObjectId(id) });
}
