import { CiEdit } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import { Timer } from "./Time";
import { getLanguages } from "@/services/language.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ILanguage } from "@/interface/schema/schema.interface";

export const Header = ({
  language,
  setLanguage,
  time,
}: {
  language?: string | ILanguage;
  setLanguage: React.Dispatch<React.SetStateAction<ILanguage>>;
  time: number;
}) => {
  const {
    data: languages,
    error,
    isLoading,
  } = useQuery({
    enabled: typeof language !== "string",
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  useEffect(() => {
    if (!language && languages?.[0]) {
      setLanguage(languages?.[0]);
    }
  }, [languages]);

  return (
    <div className="flex items-end justify-between">
      <div className="flex gap-2 items-center">
        {!language || typeof language === "string" ? (
          <>
            <p className="text-gray-600">{language || "Loading..."}</p>
            <CiEdit size={18} />
          </>
        ) : (
          <Select
            value={language.id.toString()}
            onValueChange={(value) => {
              const selectedLang = languages?.find(
                (lang) => lang.id === Number(value)
              );
              if (!selectedLang) return;
              setLanguage(selectedLang);
            }}
          >
            <SelectTrigger className="outline-none border-none pb-1 px-0 min-w-32 bg-none !ring-0 !shadow-none text-base">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages?.length &&
                languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang?.id?.toString() || ""}>
                    {lang.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="setting flex items-end gap-1">
        <IoSettingsOutline size={20} className="text-gray-500 mb-1" />
        <p className="h-7 rounded-lg mb-0.5 bg-green-500 text-white px-3 flex items-center justify-center">
          Dễ
        </p>
        <RiTimerLine size={20} className="text-gray-500 ml-2 mb-1" />
        <Timer time={time} />
      </div>
    </div>
  );
};
