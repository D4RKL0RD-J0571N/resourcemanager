import { NextResponse } from "next/server";
import { updateResource, deleteResource } from "@/lib/resourceService";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await req.json();
  await updateResource(id, data);
  return NextResponse.json({ message: "Resource updated" });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await deleteResource(id);
  return NextResponse.json({ message: "Resource deleted" });
}
