import { NextResponse } from "next/server";
import { getAllResources, addResource } from "@/lib/resourceService";

export async function GET() {
  try {
    const resources = await getAllResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await addResource(data);
    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add resource" }, { status: 500 });
  }
}
