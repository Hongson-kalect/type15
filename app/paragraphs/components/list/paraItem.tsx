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
        return <LockOpen size={20} className="text-green-500" />;
      case "protected":
        if (protectedType === "pass")
          return <FileKey2 size={20} className="text-orange-500" />;
        else return <CircleDollarSign size={20} className="text-amber-400" />;
      case "private":
        return <Lock size={20} className="text-red-500" />;
    }
  };

  return (
    <div
      className="flex gap-2 items-center w-full h-16 shadow shadow-gray-200"
      //   style={{ borderBottom: "1px solid #888" }}
    >
      <div className="scope w-12 flex justify-center">
        {renderScope(paragraph.scope, paragraph.protectedType)}
      </div>
      <div className="favorite w-12 flex justify-center">
        <Star
          size={20}
          className={`${
            paragraph.scope === "public" ? "text-pink-400" : "text-gray-400"
          }`}
        />
      </div>
      <div className="completed w-12 text-gray-700 text-center text-center">
        {paragraph.completed || <p className="text-gray-300">0</p>}
      </div>
      <div className="length w-36 flex justify-center">
        <div className="font-bold text-gray-500 flex items-center gap-3">
          <div className="flex flex-col items-center justify-center text-blue-600 w-12 text-sm">
            {paragraph.content?.split(" ").length || 0}
            <p className="text-xs font-light px-2 py-0.5 shadow shadow-blue-300 rounded-md">
              WORD
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-sm text-orange-400">
            {paragraph.content?.replaceAll(" ", "").length || 0}
            <p className="text-xs font-light px-2 py-0.5 shadow shadow-orange-300 rounded-md">
              CHAR
            </p>
          </div>
        </div>
      </div>
      <div className="title flex-1 text-sm text-gray-700 line-clamp-1">
        {paragraph.title}
      </div>
      <div className="scope w-20 flex justify-center text-gray-600 text-xs">
        {relativeDate(new Date(paragraph.createdAt))}
      </div>
    </div>
  );
}
