import * as React from "react";
import ParaListTable from "./table";
import { IParagraph } from "@/interface/schema/schema.interface";
import ParaItem from "./paraItem";
import {
  Book,
  BookText,
  CheckCheck,
  Lock,
  PencilRuler,
  Star,
  Upload,
} from "lucide-react";

export interface IParaListProps {
  paragraphs: IParagraph[];
}

export default function ParaList({ paragraphs }: IParaListProps) {
  console.log("paragraphs :>> ", paragraphs);
  return (
    <div className="p-4 bg-white rounded-2xl mt-4">
      {/* <ParaListFilter /> */}
      {!paragraphs?.length ? (
        <div className="text-gray-500 text-center">No paragraph found</div>
      ) : (
        <div>
          <div
            className="flex gap-2 items-center w-full h-12 shadow shadow-gray-300"
            //   style={{ borderBottom: "1px solid #888" }}
          >
            <div className="scope w-12 flex justify-center">
              <Lock size={20} className="text-gray-500" />
            </div>
            <div className="favorite w-12 flex justify-center">
              <Star size={20} className={"text-gray-500"} />
            </div>
            <div className="completed w-12 flex justify-center">
              <CheckCheck size={20} className={"text-gray-500"} />
            </div>
            <div className="length w-36 flex justify-center">
              <PencilRuler size={20} className={"text-gray-500"} />
            </div>
            <div className="scope flex-1">
              <BookText size={20} className={"text-gray-500"} />
            </div>
            <div className="scope w-20 flex justify-center">
              <Upload size={20} className="text-gray-500" />
            </div>
          </div>
          {paragraphs?.map(
            (para, index) => para && <ParaItem paragraph={para} key={index} />
          )}
        </div>
      )}
    </div>
  );
}
