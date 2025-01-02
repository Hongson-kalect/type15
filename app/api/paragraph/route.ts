import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GetDTO } from "./dto";
import { makeQuery } from "../utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    page = 1,
    limit = 10,
    // skip = 0,
    search = "",
    ...filters
  }: GetDTO = makeQuery(req?.url || "");

  if (filters.favorite) {
    filters.favorite = {
      some: filters.userId,
    };
  }
  if (filters.history) {
    filters.history = {
      some: filters.userId,
    };
  }
  if (!filters.self) {
    delete filters.userId;
  }

  try {
    const list = await prisma.paragraph.findMany({
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
        [orderColumn]: orderType,
      },
      take: Number(limit),
      skip: Number(page) * (Number(limit) - 1),
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

  const newItem = await prisma.paragraph.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}

export async function DELETE(req: NextRequest) {
  const { id } = makeQuery(req?.url || "");

  try {
    await prisma.paragraph.delete({
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
