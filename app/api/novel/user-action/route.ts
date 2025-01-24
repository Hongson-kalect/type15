import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { makeQuery } from "../../utils";
import { GetUserAction } from "@/interface/server/novel";
import { UserAction } from "@/interface/type/novel";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { ...filters }: GetUserAction = makeQuery(req?.url || "");

  try {
    const novel = await prisma.novel.findUnique({
      where: { id: filters.novelId },
      include: {
        _count: {
          select: {
            like: {
              where: { isDeleted: false, novelId: filters.novelId }, // moved the `isDeleted` filter to the correct place
            },
            favorite: {
              where: { isDeleted: false, novelId: filters.novelId }, // moved the `isDeleted` filter to the correct place
            },
            report: {
              where: { isDeleted: false, novelId: filters.novelId }, // moved the `isDeleted` filter to the correct place
            },
          },
        },
        like: {
          where: {
            isDeleted: false,
            novelId: filters.novelId,
            userId: filters.userId,
          },
        },
        favorite: {
          where: {
            isDeleted: false,
            novelId: filters.novelId,
            userId: filters.userId,
          },
        },
        report: {
          where: {
            isDeleted: false,
            novelId: filters.novelId,
            userId: filters.userId,
          },
        },
      },
    });

    const res = {
      like: novel?._count.like || 0,
      isLiked: !!novel?.like.length,
      favorite: novel?._count.favorite || 0,
      isFavorited: !!novel?.favorite.length,
      report: novel?._count.report || 0,
      isReported: !!novel?.report.length,
    };

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve posts", error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestBody: UserAction = await request.json();

  if (requestBody.action == "like") {
    if (!requestBody.state) {
      await prisma.like.deleteMany({
        where: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unliked" });
    } else {
      await prisma.like.create({
        data: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "liked" });
    }
  }

  if (requestBody.action == "favorite") {
    if (!requestBody.state) {
      await prisma.favorite.deleteMany({
        where: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unfavorited" });
    } else {
      await prisma.favorite.create({
        data: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "favorited" });
    }
  }

  if (requestBody.action == "report") {
    if (!requestBody.state) {
      await prisma.report.deleteMany({
        where: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unreported" });
    } else {
      await prisma.report.create({
        data: {
          novelId: requestBody.novelId,
          userId: requestBody.userId,
          reportType: requestBody.reportType || "other",
          desc: requestBody.desc || "",
        },
      });
      return NextResponse.json({ message: "reported" });
    }
  }
}
