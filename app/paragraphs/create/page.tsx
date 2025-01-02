"use client";

import * as React from "react";
import CreateParaForm from "./components/form";
import CreateParaOptions from "./components/options";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AddParagraphOption,
  ParagraphFilterType,
} from "@/interface/type/paragraph";
import { mainLayoutStore } from "@/store/mainLayout.store";

export interface ICreateParagraphProps {}

export default function CreateParagraph(props: ICreateParagraphProps) {
  const { userInfo } = mainLayoutStore();

  const [options, setOptions] = React.useState<AddParagraphOption>({
    languageId: userInfo?.languageId || 1,
    scope: "public",
    protectedType: "pass",
    password: "",
    price: 0,
    novelId: 0,
    chapter: "",
  });
  return (
    <div className="para-create flex flex-col py-4 px-6">
      <div
        // href={window.history.back()}
        className="flex w-24 gap-4 items-center -ml-1.5 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <ChevronLeft />
        <p className="font-bold text-lg">Back</p>
      </div>
      <div className="flex gap-4">
        <CreateParaForm />
        <CreateParaOptions options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
