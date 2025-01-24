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
    const list = await prisma.novel.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { desc: { contains: search, mode: "insensitive" } },
              { tag: { contains: search, mode: "insensitive" } },
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
        _count: {
          select: {
            favorite: { where: { isDeleted: false, novelId: filters.novelId } },
            like: { where: { isDeleted: false, novelId: filters.novelId } },
            report: { where: { isDeleted: false, novelId: filters.novelId } },
            paragraphs: {
              where: { isDeleted: false, novelId: filters.novelId },
            },
          },
        },
        like: {
          where: {
            isDeleted: false,
            paragraphId: filters.paragraphId,
            userId: filters.userId,
          },
        },
        favorite: {
          where: {
            isDeleted: false,
            paragraphId: filters.paragraphId,
            userId: filters.userId,
          },
        },
        report: {
          where: {
            isDeleted: false,
            paragraphId: filters.paragraphId,
            userId: filters.userId,
          },
        },
      },
    });

    // const res = list.map((item)=>{
    //   let novel = {...item};

    //   const count = {
    //     like: item._count.like,
    //     favorite: item._count.favorite,
    //     report: item._count.report
    //   }
    //   novel={
    //     ...novel,
    //     ...count
    //   }

    //   delete novel._count;
    //   return novel
    // })

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

  const newItem = await prisma.novel.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}

export async function DELETE(req: NextRequest) {
  const { id } = makeQuery(req?.url || "");

  try {
    await prisma.novel.delete({
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
