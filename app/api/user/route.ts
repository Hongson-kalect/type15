import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next";
import { GetDTO } from "./dto";
import { makeQuery } from "../utils";
import { trimedAppUser } from "./utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    limit = 10,
    skip = 0,
    search = "",
    ...filters
  }: GetDTO = makeQuery(req?.url || "");

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

  if (!appUser)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const trimmedAppUser = trimedAppUser(appUser);
  console.log("trimmedAppUser :>> ", trimmedAppUser);

  if (trimmedAppUser) {
    return NextResponse.json(trimmedAppUser);
    // prisma.appUser.update({ where: { id: appUser.id }, data: { userId } });
  } else {
    console.log(1);
    const newAppUser = await prisma.appUser.create({
      data: { userId },
    });
    console.log(2);
    return NextResponse.json(trimedAppUser(newAppUser));
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = makeQuery(req?.url || "");

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
