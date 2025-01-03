import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next";
import { GetDTO } from "./dto";
import { makeQuery, signToken, verifyToken, verifyUser } from "../utils";
import { trimingAppUser } from "./utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const {
    orderColumn = "createdAt",
    orderType = "desc",
    limit = 10,
    page = 1,
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

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  verifyUser(request);

  const { user } = requestBody; //body từ request
  const { id: userId } = user;

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

  const trimedAppUser = trimingAppUser(appUser);
  if (trimedAppUser) {
    const access_token = signToken({ userId: trimedAppUser.id });
    return NextResponse.json({ ...trimedAppUser, access_token });
  } else {
    const provider = await prisma.user.findUnique({ where: { id: userId } });
    const newAppUser = await prisma.appUser.create({
      data: { userId, username: provider?.name || "Guess" },
    });
    const access_token = signToken({ userId: newAppUser.id });
    return NextResponse.json({ ...newAppUser, access_token });
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
