import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const item = await prisma.language.findUnique({
      where: { id: Number(id) },
    });

    if (item) {
      return NextResponse.json(item, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve post", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { ...data } = await req.json();

  try {
    const updatedPost = await prisma.language.update({
      where: { id: Number(id) },
      data: data,
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update Post", error },
      { status: 200 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.language.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete post", error },
      { status: 500 }
    );
  }
}

