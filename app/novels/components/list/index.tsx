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
        <div className="flex gap-8 flex-wrap">
          {novels?.map(
            (para, index) => para && <NovelItem novel={para} key={index} />
          )}
        </div>
      )}
    </div>
  );
}
