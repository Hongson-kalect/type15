import { INovel } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import * as React from "react";

export interface INovelReferItemProps {
  novelInfo: INovel;
}

export default function NovelReferItem({ novelInfo }: INovelReferItemProps) {
  return (
    <div className="px-2 py-1 bg-gray-200 rounded shadow shadow-gray-400">
      {novelInfo?.user?.user.name ? (
        <div>{novelInfo?.user?.user.name}</div>
      ) : null}
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1 line-clamp-1 text-sm">
          <span className="font-medium">
            {novelInfo._count.paragraphs > 1
              ? novelInfo._count.paragraphs + " chapters"
              : "Oneshot"}
          </span>
        </div>
        <div className="text-gray-400 text-xs">
          {relativeDate(new Date(novelInfo?.createdAt))}
        </div>
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
  );
}
