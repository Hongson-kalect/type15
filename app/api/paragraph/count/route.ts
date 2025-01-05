import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GetDTO } from "../dto";
import { makeQuery } from "../../utils";

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
    const count = await prisma.paragraph.count({
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
    });
    return NextResponse.json(count);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve posts", error },
      { status: 500 }
    );
  }
}
