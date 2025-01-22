import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { makeQuery } from "../../utils";
import { GetUserAction } from "@/interface/server/paragraph";
import { UserAction } from "@/interface/type/paragraph";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { ...filters }: GetUserAction = makeQuery(req?.url || "");

  try {
    const paragraph = await prisma.paragraph.findUnique({
      where: { id: filters.paragraphId },
      include: {
        _count: {
          select: {
            like: {
              where: { isDeleted: false, paragraphId: filters.paragraphId }, // moved the `isDeleted` filter to the correct place
            },
            favorite: {
              where: { isDeleted: false, paragraphId: filters.paragraphId }, // moved the `isDeleted` filter to the correct place
            },
            report: {
              where: { isDeleted: false, paragraphId: filters.paragraphId }, // moved the `isDeleted` filter to the correct place
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

    const res = {
      like: paragraph?._count.like || 0,
      isLiked: !!paragraph?.like.length,
      favorite: paragraph?._count.favorite || 0,
      isFavorited: !!paragraph?.favorite.length,
      report: paragraph?._count.report || 0,
      isReported: !!paragraph?.report.length,
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
          paragraphId: requestBody.paragraphId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unliked" });
    } else {
      await prisma.like.create({
        data: {
          paragraphId: requestBody.paragraphId,
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
          paragraphId: requestBody.paragraphId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unfavorited" });
    } else {
      await prisma.favorite.create({
        data: {
          paragraphId: requestBody.paragraphId,
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
          paragraphId: requestBody.paragraphId,
          userId: requestBody.userId,
        },
      });
      return NextResponse.json({ message: "unreported" });
    } else {
      await prisma.report.create({
        data: {
          paragraphId: requestBody.paragraphId,
          userId: requestBody.userId,
          reportType: requestBody.reportType || "other",
          desc: requestBody.desc || "",
        },
      });
      return NextResponse.json({ message: "reported" });
    }
  }
}
