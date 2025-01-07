import { IParagraph } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import * as React from "react";

export interface IParaReferItemProps {
  paraInfo: IParagraph;
}

export default function ParaReferItem({ paraInfo }: IParaReferItemProps) {
  return (
    <div className="px-2 py-1 bg-gray-200 rounded shadow shadow-gray-400">
      {paraInfo?.novel?.name ? (
        <div>{paraInfo?.novel?.name}</div>
      ) : (
        <div className="text-gray-600 text-xs line-clamp-1">Novel name</div>
      )}
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1 line-clamp-1 text-sm">
          <span className="font-medium">
            {paraInfo.chapter ? paraInfo.chapter + ":" : "Chapter 10: "}{" "}
          </span>
          {paraInfo.title}
        </div>
        <div className="text-gray-400 text-xs">
          {relativeDate(new Date(paraInfo?.createdAt))}
        </div>
      </div>
      <div className="flex gap-2 items-center w-full mt-0.5">
        <div className="flex-1"></div>
        <div className="flex gap-2 items-center text-xs">
          <div className="text-blue-400 ">
            {paraInfo.content?.split(" ")?.length || 0} Words
          </div>
          <div className="text-orange-400">
            {paraInfo.content?.replaceAll(" ", "")?.length || 0} Chars
          </div>
        </div>
      </div>
    </div>
  );
}
