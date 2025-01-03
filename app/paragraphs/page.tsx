"use client";

import * as React from "react";
import ParagraphHeader from "./components/header";
import ParaList from "./components/list";
import { ParagraphFilterType } from "@/interface/type/paragraph";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { getParagraphApi } from "@/services/paragraph.service";
import { useQuery } from "@tanstack/react-query";
import ParaPagination from "./components/list/pagination";

export default function DefaultPage() {
  const { userInfo } = mainLayoutStore();
  const [filter, setFilter] = React.useState<ParagraphFilterType>({
    orderColumn: "createdAt",
    orderType: "desc",
    search: "",
    favorite: "",
    history: "",
    self: "",
    page: 1,
    userId: userInfo?.id,
  });

  console.log("userId :>> ", userInfo);

  const {
    data: paragraphs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["paragraphs", filter],
    queryFn: async () => await getParagraphApi(filter),
  });

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, userId: userInfo?.id }));
  }, [userInfo]);
  return (
    <div className="py-4 flex-1 px-6 overflow-auto">
      <h2 className="font-medium text-2xl text-gray-700 mb-6">
        Paragraph List
      </h2>
      <ParagraphHeader filter={filter} setFilter={setFilter} />

      <div>
        <ParaPagination
          page={filter.page}
          setPage={(page) => setFilter((prev) => ({ ...prev, page }))}
          totalPage={paragraphs?.totalPage}
        />
        <ParaList paragraphs={paragraphs} />
      </div>
    </div>
  );
}
