"use client";

import { IParagraph } from "@/interface/schema/schema.interface";
import * as React from "react";
import ParaReferItem from "./paraReferItem";

export interface IParaReferProps {
  references?: IParagraph[];
}

export default function ParaRefer({ references }: IParaReferProps) {
  return (
    <div className="bg-white rounded-xl p-4 w-[320px] flex-1 overflow-auto">
      <p className="font-medium text-xl mb-2">Reference</p>
      <div className="flex flex-col gap-4">
        {references ? (
          references?.map((ref, index) => (
            <ParaReferItem key={index} paraInfo={ref} />
          ))
        ) : (
          <div>no references</div>
        )}
      </div>
    </div>
  );
}
