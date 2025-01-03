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
    search = "",
    ...filters
  }: GetDTO = makeQuery(req?.url || "");

  console.log(
    " makeQuery(req?.url ||), :>> ",
    req?.url,
    makeQuery(req?.url || "")
  );

  console.log("params", orderColumn, orderType, page, limit, search.toString());

  if (filters.favorite && filters.userId) {
    filters.favorite = {
      some: {
        id: Number(filters.userId),
      },
    };
  } else delete filters.favorite;

  if (filters.history && filters.userId) {
    filters.history = {
      some: {
        id: Number(filters.userId),
      },
    };
  } else delete filters.history;

  if (filters.self && filters.userId) {
    filters.userId = Number(filters.userId);
  } else {
    delete filters.userId;
  }
  delete filters.self;

  console.log("filters :>> ", filters);

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
      skip: Number(limit) * (Number(page) - 1),
      include: {
        user: {
          select: { username: true },
        },
        language: {
          select: { name: true },
        },
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve posts", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json(); //body từ request

  console.log("requestBody :>> ", JSON.stringify(requestBody), requestBody);

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
