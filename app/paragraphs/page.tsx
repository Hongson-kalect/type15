"use client";

import * as React from "react";
import ParagraphHeader from "./components/header";
import ParaList from "./components/list";
import { ParagraphFilterType } from "@/interface/type/paragraph";
import { mainLayoutStore } from "@/store/mainLayout.store";

export default function DefaultPage() {
  const { userInfo } = mainLayoutStore();
  const [filter, setFilter] = React.useState<ParagraphFilterType>({
    orderColumn: "createdAt",
    orderType: "desc",
    search: "",
    favorite: false,
    history: false,
    self: false,
    page: 1,
    userId: userInfo?.id,
  });

  React.useEffect(() => {}, [filter]);
  return (
    <div className="py-4 flex-1 px-6 overflow-auto">
      <ParagraphHeader filter={filter} setFilter={setFilter} />
      <ParaList />
    </div>
  );
}
