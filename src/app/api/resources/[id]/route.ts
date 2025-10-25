import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("resourcemanager");
    const data = await request.json();
    await db.collection("resources").updateOne(
      { _id: new (await import("mongodb")).ObjectId(params.id) },
      { $set: data }
    );
    return NextResponse.json({ message: "Resource updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("resourcemanager");
    await db.collection("resources").deleteOne(
      { _id: new (await import("mongodb")).ObjectId(params.id) }
    );
    return NextResponse.json({ message: "Resource deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
