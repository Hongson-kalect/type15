import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next";
import { GetDTO } from "./dto";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    limit = 10,
    skip = 0,
    search = "",
    ...filters
  }: GetDTO = req.query;

  try {
    const list = await prisma.appUser.findMany({
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
  const requestBody = await request.json();
  console.log("requestBody :>> ", requestBody);
  const { user } = requestBody; //body từ request
  const { id: userId } = user;
  console.log("userId :>> ", userId);

  const appUser = await prisma.appUser.findUnique({
    where: { userId },
    include: {
      asset: true,
      setting: true,
      user: true,
    },
  });

  console.log("appUser :>> ", appUser);

  if (appUser) {
    return NextResponse.json(appUser);
    // prisma.appUser.update({ where: { id: appUser.id }, data: { userId } });
  } else {
    console.log(1);
    const newAppUser = await prisma.appUser.create({
      data: { userId },
    });
    console.log(2);
    return NextResponse.json(newAppUser);
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = req.query;

  try {
    await prisma.appUser.delete({
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
