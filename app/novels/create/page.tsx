"use client";

import { AddNovelOption, AddNovelValue } from "@/interface/type/novel";
import { createNovelService } from "@/services/novel.service";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import CreateParaForm from "./components/form";
import CreateParaOptions from "./components/options";

export default function CreateNovel() {
  const queryClient = useQueryClient();
  const { userInfo } = mainLayoutStore();
  const router = useRouter();

  const [options, setOptions] = React.useState<AddNovelOption>({
    languageId: userInfo?.languageId || 1,
    scope: "public",
    protectedType: "pass",
    password: "",
    price: 0,
  });

  const {
    mutate: createNovel,
    error,
    isLoading,
  } = useMutation({
    mutationKey: ["createNovel"],
    mutationFn: async (novelValue: AddNovelValue) =>
      await createNovelService({
        ...novelValue,
        ...options,
        userId: userInfo?.id || 0,
      }),
    onSuccess: (data) => {
      toast.success("Create novel success");
      queryClient.refetchQueries({ queryKey: ["novels", "novelCount"] });
      router.back();
    },
    onError: (error) => {
      toast.success("Create novel success");
      console.log("error :>> ", error);
    },
  });

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
        <CreateParaForm createNovel={createNovel} />
        <CreateParaOptions options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
