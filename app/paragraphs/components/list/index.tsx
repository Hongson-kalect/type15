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
      {
        !paragraphs?.length ? (
          <div className="text-gray-500 text-center">No paragraph found</div>
        ) : (
          <div>
            <div
              className="flex gap-2 items-center w-full h-12 shadow shadow-gray-300"
              //   style={{ borderBottom: "1px solid #888" }}
            >
              <div className="scope w-12 flex justify-center">
                <Lock className="text-gray-500" />
              </div>
              <div className="favorite w-12 text-center">
                <Star className={"text-gray-500"} />
              </div>
              <div className="scope w-12 text-center">
                <CheckCheck className={"text-gray-500"} />
              </div>
              <div className="scope w-12 text-center">
                <PencilRuler className={"text-gray-500"} />
              </div>
              <div className="scope flex-1 text-center">
                <BookText className={"text-gray-500"} />
              </div>
              <div className="scope w-12 text-center">
                <Upload className="text-gray-500" />
              </div>
            </div>
            {paragraphs?.map(
              (para, index) => para && <ParaItem paragraph={para} key={index} />
            )}
          </div>
          // <table className="w-full">
          //   <thead>
          //     <tr className="mb-10">
          //       <th className="flex justify-center w-12">
          //         <Lock color="#666" className="" />
          //       </th>
          //       <th>
          //         <Star className="w-12" color="#666" />
          //       </th>
          //       <th>
          //         <CheckCheck />
          //       </th>
          //       <th>
          //         <PencilRuler />
          //       </th>
          //       <th>Title</th>
          //       <th>Uploaded</th>
          //     </tr>
          //   </thead>
          //   <tbody>
        )
        //   </tbody>
        // </table>
      }
      <ParaListTable />
    </div>
  );
}
