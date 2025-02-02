"use client";

import { ChevronLeft } from "lucide-react";
import * as React from "react";
import EditParaForm from "./components/EditForm";
import EditNovOption from "./components/Option";
import EditNovelForm from "./components/EditForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editNovelService,
  getNovelDetailService,
} from "@/services/novel.service";
import { INovel } from "@/interface/schema/schema.interface";
import { toast } from "react-toastify";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { useRouter } from "next/navigation";
import { AddNovelOption, AddNovelValue } from "@/interface/type/novel";

export default function EditNovel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

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
    mutate: editNovel,
    error,
    isLoading,
  } = useMutation({
    mutationKey: ["editNovel"],
    mutationFn: async (novelValue: AddNovelValue) =>
      await editNovelService({
        id: Number(id),
        data: {
          ...novelValue,
          ...options,
          userId: userInfo?.id || 0,
        },
      }),
    onSuccess: (data) => {
      toast.success("Create novel success");
      queryClient.refetchQueries({ queryKey: ["novels", "novelCount"] });
      router.back();
    },
    onError: (error) => {
      toast.success("Edit novel success");
      console.log("error :>> ", error);
    },
  });

  const novelDetail = useQuery<INovel>({
    queryFn: async () => await getNovelDetailService(Number(id)),
    queryKey: ["novelDetail"],
  });

  React.useEffect(() => {
    if (!novelDetail.data) return;
    setOptions({
      languageId: novelDetail.data?.languageId,
      scope: novelDetail.data?.scope || "public",
      protectedType: novelDetail.data?.protectedType || "pass",
      password: novelDetail.data?.password || "",
      price: novelDetail.data?.price || 0,
    });
  }, [novelDetail.data]);
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
        <EditNovelForm editNovel={editNovel} novelValue={novelDetail.data} />
        <EditNovOption options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}
