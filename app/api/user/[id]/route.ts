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
    const item = await prisma.appUser.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
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

  console.log("data :>> ", data);

  try {
    const updatedPost = await prisma.appUser.update({
      where: { id: Number(id) },
      data: data,
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update Post", error },
      { status: 400 }
    );
  }
}
