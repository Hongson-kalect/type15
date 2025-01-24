import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const item = await prisma.novel.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        desc: true,
        createdAt: true,
        scope: true,
        languageId: true,
        status: true,
        tag: true,
        name: true,
        price: true,
        priceUnitId: true,
        user: {
          select: {
            profile: {
              select: {
                avatar: true,
                displayName: true,
                firstName: true,
                lastName: true,
              },
            },
            user: {
              select: {
                image: true,
                name: true,
              },
            },
          },
        },
        paragraphs: true,
      },
    });

    if (item) {
      const references = await prisma.novel.findMany({
        where: { id: { not: Number(id) }, languageId: item.languageId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          desc: true,
          user: {
            select: {
              user: {
                select: { name: true },
              },
              profile: {
                select: {
                  displayName: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },

          _count: {
            select: {
              paragraphs: true,
            },
          },
        },
        take: 10,
      });

      return NextResponse.json({ ...item, references }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve post", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { ...data } = await req.json();

  try {
    const updatedPost = await prisma.novel.update({
      where: { id: Number(id) },
      data: data,
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update Post", error },
      { status: 200 }
    );
  }
}
