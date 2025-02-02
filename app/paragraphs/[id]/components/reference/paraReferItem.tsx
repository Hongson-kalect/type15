import { IParagraph } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export interface IParaReferItemProps {
  paraInfo: IParagraph;
}

export default function ParaReferItem({ paraInfo }: IParaReferItemProps) {
  return (
    <Link href={`/paragraphs/${paraInfo.id}`}>
      <div className="px-2 py-1 bg-cyan-50 rounded shadow shadow-gray-400">
        {paraInfo?.novel?.name ? (
          <div className="text-gray-600 text-xs line-clamp-1">
            {paraInfo?.novel?.name}
          </div>
        ) : null}
        <div className="flex gap-2 items-center w-full ">
          <div className="flex-1 line-clamp-1 text-sm">
            <span className="font-medium">
              {paraInfo.chapter ? "Chapter " + paraInfo.chapter + ":" : null}{" "}
            </span>
            {paraInfo.title}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-between w-full mt-0.5">
          <div className="flex gap-2 items-center text-xs">
            <div className="text-blue-400 ">
              {paraInfo.content?.split(" ")?.length || 0} Words
            </div>
            <div className="text-orange-400">
              {paraInfo.content?.replaceAll(" ", "")?.length || 0} Chars
            </div>
          </div>
          <div className="text-gray-400 text-xs">
            {relativeDate(new Date(paraInfo?.createdAt))}
          </div>
        </div>
      </div>
    </Link>
  );
}
