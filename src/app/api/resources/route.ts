import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const resources = await db.collection("resources").find({}).toArray();
        return NextResponse.json(resources);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const result = await db.collection("resources").insertOne(body);
        return NextResponse.json({ _id: result.insertedId, ...body });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add resource" }, { status: 500 });
    }
}
