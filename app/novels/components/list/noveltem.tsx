import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { INovel } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import { mainLayoutStore } from "@/store/mainLayout.store";
import {
  CircleDollarSign,
  FileKey2,
  Heart,
  KeyRound,
  Lock,
  LockOpen,
  Star,
  ThumbsUp,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface INovelItemProps {
  novel: INovel;
}

export default function NovelItem({ novel }: INovelItemProps) {
  const { userInfo } = mainLayoutStore();

  const renderScope = (scope: string, protectedType?: string) => {
    switch (scope) {
      case "public":
        return <LockOpen size={20} className="text-green-500" />;
      case "protected":
        if (protectedType === "pass")
          return <FileKey2 size={20} className="text-orange-500" />;
        else return <CircleDollarSign size={20} className="text-amber-400" />;
      case "private":
        return <Lock size={20} className="text-red-500" />;
    }
  };

  // const BookCard = ({ image, title, follows, likes }) => (
  return (
    <div className="p-4">
      <div className="rounded max-w-44 mx-auto shadow px-2 py-2 shadow-gray-400 cursor-pointer hover:scale-105 duration-300 hover:shadow-md hover:shadow-gray-500">
        <div>
          <Image
            src={
              "https://img5.thuthuatphanmem.vn/uploads/2022/01/06/anh-tuyet-dep-anime-nu-ngau-lanh-lung_085606116.jpg"
            }
            alt="Book Image"
            className="w-full object-cover"
            width={240}
            height={320}
          />
        </div>
        <div>
          <h2 className="text mt-2 line-clamp-2 text-sm font-medium text-gray-600">
            {/* {"Alibaba và 40 tên cướp, chuyển sinh thành con óc chó gì đó"} */}
            {novel.name}
          </h2>
          <div className="flex justify-between mt-2 opacity-80 gap-1 ">
            <div className="flex">
              <div
                className={`${
                  novel.like.length ? "text-blue-700" : ""
                } flex gap-1  items-end mr-2`}
              >
                <ThumbsUp size={16} />
                <p className="text-xs">{novel._count?.like}</p>
              </div>
              <div
                className={`${
                  novel.favorite.length ? "text-pink-500" : ""
                } flex gap-1  items-end mr-2`}
              >
                <Heart size={16} />
                <p className="text-xs">{novel._count?.favorite}</p>
              </div>
            </div>
            {userInfo.id && novel?.userId === userInfo.id && (
              <div className="text-red-700">
                <UserRound size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link
      href={`/novels/${novel.id}`}
      className="flex gap-2 items-center w-full h-16 shadow shadow-gray-100"
      //   style={{ borderBottom: "1px solid #888" }}
    >
      <div className="scope w-12 flex justify-center">
        {renderScope(novel.scope, novel.protectedType)}
      </div>
      <div className="favorite w-12 flex justify-center">
        <Star
          size={20}
          className={`${
            novel.scope === "public" ? "text-pink-400" : "text-gray-400"
          }`}
        />
      </div>
      <div className="completed w-12 text-gray-700 flex justify-center text-center">
        {novel.completed || <p className="text-gray-300">0</p>}
      </div>
      <div className="length w-36 flex justify-center">
        <div className="font-bold text-gray-500 flex items-center gap-3">
          <div className="flex flex-col items-center justify-center text-blue-600 w-12 text-sm">
            {novel.content?.split(" ").length || 0}
            <p className="text-xs font-light px-2 py-0.5 shadow shadow-blue-300 rounded-md">
              WORD
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-sm text-orange-400">
            {novel.content?.replaceAll(" ", "").length || 0}
            <p className="text-xs font-light px-2 py-0.5 shadow shadow-orange-300 rounded-md">
              CHAR
            </p>
          </div>
        </div>
      </div>
      <div className="title flex-1 text-sm text-gray-700 line-clamp-1">
        <p className="text-gray-400">{novel.novel?.name || null}</p>
        <div className="flex gap-2">
          <span className="font-medium">
            {novel.chapter ? `Chapter ${novel.chapter}: ` : null}
          </span>
          <span className="text-gray-800">{novel.title}</span>
        </div>
      </div>
      <div className="scope w-20 flex justify-center text-gray-600 text-xs">
        {relativeDate(new Date(novel.createdAt))}
      </div>
    </Link>
  );
}
