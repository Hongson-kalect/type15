"use client";

import * as React from "react";
import NovelInfo from "./components/novelinfo";
import NovelRefer from "./components/reference";
import { getNovelDetailService } from "@/services/novel.service";
import { useQuery } from "@tanstack/react-query";
import { INovel } from "@/interface/schema/schema.interface";

export default function NovelDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const novelDetailQuery = useQuery<INovel>({
    queryKey: ["novelDetail", id],
    queryFn: async () => await getNovelDetailService(Number(id)),
  });

  return (
    <div className="py-4 h-full flex px-6 gap-8 hide-scroll">
      <div className="flex-1 overflow-auto hide-scroll">
        <NovelInfo novelInfo={novelDetailQuery.data} />
      </div>
      <div className="flex flex-col gap-4 h-full">
        <NovelRefer references={novelDetailQuery.data?.references} />
      </div>
    </div>
  );
}
