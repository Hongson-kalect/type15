import { IParagraph } from "@/interface/schema/schema.interface";
import * as React from "react";
import ParagraphItem from "../../../components/novelinfo/ParagraphItem";

export interface INovelParagraphListProps {
  novelParagraphList: IParagraph[];
}

export default function NovelParagraphList({
  novelParagraphList,
}: INovelParagraphListProps) {
  return (
    <div className="bg-white px-4 py-3 rounded-xl flex-1 overflow-auto">
      {novelParagraphList?.length &&
        novelParagraphList.map((item, index) => (
          <ParagraphItem paragraph={item} key={index} />
        ))}
    </div>
  );
}
