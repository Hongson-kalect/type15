import { IParagraph } from "@/interface/schema/schema.interface";
import * as React from "react";

export interface IParagraphItemProps {
  paragraph: IParagraph;
}

export default function ParagraphItem({ paragraph }: IParagraphItemProps) {
  return (
    <div className="px-3 py-2">
      <div className="flex gap-2">
        {paragraph.chapter ? paragraph.chapter + ": " : null}
        <div>{paragraph.title}</div>
      </div>
    </div>
  );
}
