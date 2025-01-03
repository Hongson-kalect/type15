import { IParagraph } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import {
  CircleDollarSign,
  FileKey2,
  KeyRound,
  Lock,
  LockOpen,
  Star,
} from "lucide-react";
import * as React from "react";

export interface IParaItemProps {
  paragraph: IParagraph;
}

export default function ParaItem({ paragraph }: IParaItemProps) {
  console.log("paragraph :>> ", paragraph);

  const renderScope = (scope: string, protectedType?: string) => {
    switch (scope) {
      case "public":
        return <LockOpen className="text-green-500" />;
      case "protected":
        if (protectedType === "pass")
          return <FileKey2 className="text-orange-500" />;
        else return <CircleDollarSign className="text-amber-400" />;
      case "private":
        return <Lock className="text-red-500" />;
    }
  };

  return (
    <div
      className="flex gap-2 items-center w-full h-12 shadow shadow-gray-300"
      //   style={{ borderBottom: "1px solid #888" }}
    >
      <div className="scope w-12 flex justify-center">
        {renderScope(paragraph.scope, paragraph.protectedType)}
      </div>
      <div className="favorite w-12 text-center">
        <Star
          className={`${
            paragraph.scope === "public" ? "text-pink-400" : "text-gray-400"
          }`}
        />
      </div>
      <div className="completed w-12 text-gray-700 text-center">
        {paragraph.completed || <p className="text-gray-300">0</p>}
      </div>
      <div className="length w-40 text-center">
        <div className="font-bold text-gray-800 flex items-center">
          <div className="flex flex-col items-center justify-center">
            {paragraph.content?.split(" ").length || 0}
            <p className="text-xs">WORD</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            {paragraph.content?.replaceAll(" ", "").length || 0}
            <p>CHAR</p>
          </div>
        </div>
        <div className="title flex-1 text-center">{paragraph.title}</div>
        <div className="scope w-12 text-center">
          {relativeDate(new Date(paragraph.createdAt))}
        </div>
      </div>
    </div>
  );
}
