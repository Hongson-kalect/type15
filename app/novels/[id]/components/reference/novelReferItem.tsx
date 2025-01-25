import { INovel } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import * as React from "react";
import defaultBackground from "@/assets/images/default-background.jpg";
import Image from "next/image";

export interface INovelReferItemProps {
  novelInfo: INovel;
}

export default function NovelReferItem({ novelInfo }: INovelReferItemProps) {
  return (
    <div className="px-2 py-1 bg-gray-200 rounded shadow shadow-gray-400 flex gap-2">
      <div className="w-12 h-14 relative rounded-xl">
        <Image
          src={novelInfo.image || defaultBackground}
          alt={novelInfo.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex justify-between flex-1 items-center">
        <div>
          {novelInfo?.user?.user.name ? (
            <div className="text-gray-600 text-xs">
              {novelInfo?.user?.user.name}
            </div>
          ) : null}
          <div className="text-sm text-gray-700 font-medium">
            {novelInfo.name}
          </div>
          <div className="flex gap-2 items-center w-full mt-0.5">
            <div className="flex-1 line-clamp-1 text-sm">
              <span className="font-light text-xs text-gray-500">
                Chapter:{" "}
                {novelInfo._count.paragraphs > 1
                  ? novelInfo._count.paragraphs
                  : "Oneshot"}
              </span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          {relativeDate(new Date(novelInfo?.createdAt))}
        </div>
        {/* <div className="flex gap-2 items-center w-full mt-0.5">
        <div className="flex-1"></div>
        <div className="flex gap-2 items-center text-xs">
          <div className="text-blue-400 ">
            {novelInfo.content?.split(" ")?.length || 0} Words
          </div>
          <div className="text-orange-400">
            {novelInfo.content?.replaceAll(" ", "")?.length || 0} Chars
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
}
