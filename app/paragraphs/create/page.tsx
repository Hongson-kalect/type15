"use client";

import {
  AddParagraphOption,
  AddParagraphValue,
} from "@/interface/type/paragraph";
import { createParagraphApi } from "@/services/paragraph.service";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import CreateParaForm from "./components/form";
import CreateParaOptions from "./components/options";

export interface ICreateParagraphProps {}

export default function CreateParagraph(props: ICreateParagraphProps) {
  const queryClient = useQueryClient();
  const { userInfo } = mainLayoutStore();
  const router = useRouter();

  const [options, setOptions] = React.useState<AddParagraphOption>({
    languageId: userInfo?.languageId || 1,
    scope: "public",
    protectedType: "pass",
    password: "",
    price: 0,
    // novelId: undefined,
    chapter: "",
  });

  const {
    mutate: createParagraph,
    error,
    isLoading,
  } = useMutation({
    mutationKey: ["createParagraph"],
    mutationFn: async (paraValue: AddParagraphValue) =>
      await createParagraphApi({
        ...paraValue,
        ...options,
        userId: userInfo?.id || 0,
      }),
    onSuccess: (data) => {
      toast.success("Create paragraph success");
      queryClient.refetchQueries({ queryKey: ["paragraphs", "paraCount"] });
      router.back();
    },
    onError: (error) => {
      toast.success("Create paragraph success");
      console.log("error :>> ", error);
    },
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
        <CreateParaForm createParagraph={createParagraph} />
        <CreateParaOptions options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
