import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { GetDTO } from "./dto";
import { makeQuery } from "../utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const {
    orderColumn = "score",
    orderType = "desc",
    limit = 10,
    page = 1,
    search = "",
    ...filters
  }: GetDTO = makeQuery(req?.url || "");

  try {
    const list = await prisma.score.findMany({
      where: {
        AND: [
          {
            // OR: [
            //   { title: { contains: search, mode: "insensitive" } },
            //   { content: { contains: search, mode: "insensitive" } },
            // ],
          },
          filters,
          { isDeleted: false },
        ],
      },
      include: {
        user: {
          select: {
            username: true,
            user: true,
          },
        },
      },
      orderBy: {
        [orderColumn]: orderType || "desc", // Default to 'desc' if orderType is undefined
      },
      take: Number(limit),
      skip: Number(limit) * (Number(page) - 1),
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
  const requestBody = await request.json();

  if (requestBody.type === "paragraph") {
    //body từ request
    //if server really fast, may use this to validate that paragraph exist
    // const paragraph = await prisma.paragraph.findUnique({
    //   where: { id: requestBody.targetId },
    // });

    if (!requestBody.targetId)
      return NextResponse.json(
        { message: "Paragraph not found" },
        { status: 404 }
      );

    await prisma.paragraph.update({
      where: { id: requestBody.targetId },
      data: {
        completed: {
          increment: 1,
        },
      },
    });
  }

  const newItem = await prisma.score.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}

export async function DELETE(req: NextRequest) {
  const { id } = makeQuery(req?.url || "");

  try {
    await prisma.score.delete({
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
