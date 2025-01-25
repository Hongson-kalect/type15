import { ChevronLeft } from "lucide-react";
import * as React from "react";
import EditParaForm from "./components/EditForm";
import EditNovOption from "./components/Option";
import EditNovelForm from "./components/EditForm";

export interface IEditNovelProps {}

export default function EditNovel(props: IEditNovelProps) {
  return (
    <div className="novel-create flex flex-col py-4 px-6">
      <div
        // href={window.history.back()}
        className="flex w-24 gap-4 items-center -ml-1.5 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <ChevronLeft />
        <p className="font-bold text-lg">Back</p>
      </div>
      <div className="flex gap-4">
        <EditNovelForm editNovel={editNovel} />
        <EditNovOption options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
