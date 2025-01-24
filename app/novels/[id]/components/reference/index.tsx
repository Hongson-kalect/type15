"use client";

import { INovel } from "@/interface/schema/schema.interface";
import * as React from "react";
import NovelReferItem from "./novelReferItem";

export interface INovelReferProps {
  references?: INovel[];
}

export default function NovelRefer({ references }: INovelReferProps) {
  return (
    <div className="bg-white rounded-xl p-4 w-[320px] flex-1 overflow-auto">
      <p className="font-medium text-xl mb-2">Reference</p>
      <div className="flex flex-col gap-4">
        {references ? (
          references?.map((ref, index) => (
            <NovelReferItem key={index} novelInfo={ref} />
          ))
        ) : (
          <div>no references</div>
        )}
      </div>
    </div>
  );
}
