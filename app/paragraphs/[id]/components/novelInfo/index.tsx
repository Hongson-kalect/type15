"use client";

import { INovel } from "@/interface/schema/schema.interface";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface INovelInfoProps {
  novelInfo: INovel;
}

export default function NovelInfo({ novelInfo }: INovelInfoProps) {
  const router = useRouter();
  return (
    <>
      <div className="bg-white rounded-xl p-4 w-[320px]">
        {JSON.stringify(novelInfo)}
      </div>
    </>
  );
}
