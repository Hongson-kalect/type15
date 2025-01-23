import * as React from "react";
import NovelListTable from "./table";
import { INovel } from "@/interface/schema/schema.interface";
import NovelItem from "./noveltem";
import {
  Book,
  BookText,
  CheckCheck,
  Lock,
  PencilRuler,
  Star,
  Upload,
} from "lucide-react";

export interface INovelListProps {
  novels: INovel[];
}

export default function NovelList({ novels }: INovelListProps) {
  return (
    <div className="overflow-auto">
      {/* <NovelListFilter /> */}
      {!novels?.length ? (
        <div className="text-gray-500 text-center">No novel found</div>
      ) : (
        <div>
          <div
            className="flex gap-2 items-center w-full h-12 shadow shadow-gray-300 bg-gray-100"
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
          {novels?.map(
            (para, index) => para && <NovelItem novel={para} key={index} />
          )}
        </div>
      )}
    </div>
  );
}
