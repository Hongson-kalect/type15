import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { GetDTO } from "./dto";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    limit = 10,
    skip = 0,
    search = "",
    ...filters
  }: GetDTO = req.query;

  try {
    const list = await prisma.comment.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          },
          filters,
          { isDeleted: false },
        ],
      },
      orderBy: {
        [orderColumn]: orderType || "desc", // Default to 'desc' if orderType is undefined
      },
      take: Number(limit),
      skip: Number(skip),
    });
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve posts", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.comment.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}

export async function DELETE(req: NextApiRequest) {
  const { id } = req.query;

  try {
    await prisma.comment.delete({
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
