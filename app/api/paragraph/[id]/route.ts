import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const item = await prisma.paragraph.findUnique({
      where: { id: Number(id) },
      include: {
        novel: true,
      },
    });

    if (item) {
      const references = await prisma.paragraph.findMany({
        where: { novelId: item.novelId },
        orderBy: { createdAt: "desc" },
        include: {
          novel: true,
        },
        take: 10,
      }); // Adjust this filter based on your actual logic }, orderBy: { createdAt: 'desc', }, take: 10,

      return NextResponse.json({ ...item, references }, { status: 200 });
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
    const updatedPost = await prisma.paragraph.update({
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
