import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GetDTO } from "./dto";
import { makeQuery } from "../utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const query = makeQuery(req?.url || "");
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    limit = 10,
    page = 1,
    search = "",
    ...filters
  }: GetDTO = query;

  console.log("query, filters :>> ", query, filters);

  try {
    const list = await prisma.language.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
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
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.language.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
