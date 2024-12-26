"use client";

import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ILanguage } from "@/interface/schema/schema.interface";
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from "@/services/language.service";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { setServers } from "dns";

type LanguageProps = {
  languages: ILanguage[];
  selectedLanguage: ILanguage | undefined;
  setSelectedLanguage: (item: ILanguage) => void;
};

export default function LanguageHandler(props: LanguageProps) {
  const queryClient = useQueryClient();
  const languageNameRef = React.useRef<HTMLInputElement | null>(null);
  const [language, setLanguage] = React.useState<ILanguage>({
    name: "",
    code: "",
    desc: "",
    flag: "",
  });

  const { mutate: createLanguage } = useMutation({
    mutationKey: ["createLanguage"],
    mutationFn: async () => {
      await addLanguage(language);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["languages"] });
    },
  });

  const { mutate: editLanguage } = useMutation({
    mutationFn: async () => {
      await updateLanguage(language);
    },
    onSuccess: async () => {
      toast.success("Edit ngôn ngữ thành công");
      queryClient.refetchQueries({ queryKey: ["languages"] });
    },
  });

  const { mutate: removeLanguage } = useMutation({
    mutationFn: async () => {
      await deleteLanguage(props.selectedLanguage?.id || 0);
    },
    onSuccess: async () => {
      toast.success("Xoá ngôn ngữ thành công");
      props.setSelectedLanguage(undefined);
      queryClient.refetchQueries({ queryKey: ["languages"] });
    },
  });

  React.useEffect(() => {
    languageNameRef?.current?.focus();
    if (props.selectedLanguage) {
      setLanguage({ ...props.selectedLanguage });
    } else {
      setLanguage({
        name: "",
        code: "",
        desc: "",
        flag: "",
      });
    }
  }, [props.selectedLanguage]);

  return (
    <div className="w-96 h-full bg-white p-4 rounded-2xl">
      <h2 className="text-2xl font-medium">
        {!props.selectedLanguage ? "Tạo ngôn ngữ" : "Cập nhật ngôn ngữ"}
      </h2>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p>Tên ngôn ngữ</p>
          <Input
            ref={languageNameRef}
            value={language?.name}
            onChange={(e) => setLanguage({ ...language, name: e.target.value })}
          />
        </div>
        <div>
          <p>Mã ngôn ngữ</p>
          <Input
            value={language?.code}
            onChange={(e) => setLanguage({ ...language, code: e.target.value })}
          />
        </div>
        <div>
          <p>Mô tả</p>
          <Input
            value={language?.desc}
            onChange={(e) => setLanguage({ ...language, desc: e.target.value })}
          />
        </div>
        <div>
          <p>Hình ảnh</p>
          <Input
            value={language?.flag}
            onChange={(e) => setLanguage({ ...language, flag: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-center h-20">
          {language?.flag ? (
            <Image
              className="h-full"
              src={language?.flag}
              alt="Preview Flag Image"
              width={100}
              height={60}
            />
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          {!props.selectedLanguage ? (
            <Button
              className="bg-green-400 hover:bg-green-700 w-full h-12 text-lg"
              onClick={() => createLanguage()}
            >
              Tạo moi
            </Button>
          ) : (
            <>
              <Button
                size={"lg"}
                className="bg-blue-400 hover:bg-blue-700 w-full h-12 text-lg"
                onClick={() => editLanguage()}
              >
                Cập nhật
              </Button>
              <Button
                disabled={!props.selectedLanguage}
                onClick={() => removeLanguage()}
                className="bg-red-400 hover:bg-red-700 mt-4"
              >
                Xoa
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
