"use client";
import TypeArea from "@/components/type/type-area";
import { TypeRank } from "@/components/type/type-rank";
import { Result } from "@/components/type/type-result";
import { INovel, IScore } from "@/interface/schema/schema.interface";
import { ResultDetailType } from "@/interface/type/typing";
import { getScores } from "@/services/type.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import NovelOptions from "./options";
import Image from "next/image";

export interface INovelInfoProps {
  novelInfo?: INovel;
}

export default function NovelInfo({ novelInfo }: INovelInfoProps) {
  const router = useRouter();

  if (!novelInfo) return <div>Loading...</div>;
  return (
    <div className="h-full flex flex-col gap-2">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center line-clamp-1 hover:w-full px-4 h-8 text-gray-500 italic hover:text-gray-800 hover:not-italic hover:-translate-x-4 duration-200"
      >
        <ArrowLeft />
        <div className="cursor-pointer text-lg font-medium">
          <div className="text-lg flex gap-3 font-medium text-gray-800">
            <div>{"Return"}</div>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-2">
        <Image
          src={
            "https://img5.thuthuatphanmem.vn/uploads/2022/01/06/anh-tuyet-dep-anime-nu-ngau-lanh-lung_085606116.jpg"
          }
          alt="Book Image"
          className="object-cover"
          width={240}
          height={320}
        />

        <p>{novelInfo.name}</p>
        <div className="px-2 pb-2 mt-3 text-sm text-gray-700 rounded shadow shadow-gray-400">
          <div className="font-bold text-black underline">Description</div>
          <div className="mt-1 ml-2">{novelInfo.desc}</div>
        </div>
      </div>

      <div className="flex-1 gap-4 hide-scroll rounded-xl">
        <div className="mt-6">
          <NovelOptions id={novelInfo.id} />
        </div>
      </div>
    </div>
  );
}
