import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
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
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { ...data } = req.body;

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
