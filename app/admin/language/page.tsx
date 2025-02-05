"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ILanguage } from "@/interface/schema/schema.interface";
import LanguageList from "./components/list";
import LanguageHandler from "./components/handler";
import { getLanguages } from "@/services/language.service";

export default function DefaultPage() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    ILanguage | undefined
  >();

  const {
    data: languages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  const [action, setAction] = React.useState<"create" | "update">("create");

  const setLanguage = (item: ILanguage) => {
    setSelectedLanguage(item);
    setAction("update");
  };

  React.useEffect(() => {
    if (selectedLanguage) {
      setAction("update");
    } else setAction("create");
  }, [selectedLanguage]);

  return (
    <div className="p-6 flex-1 overflow-auto">
      <div className="flex gap-4 h-full overflow-auto">
        <LanguageList
          languages={languages}
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
          setLanguage={(item: ILanguage) => setLanguage(item)}
        />
        <LanguageHandler
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
    </div>
  );
}
