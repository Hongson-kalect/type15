"use client";

import * as React from "react";
import ParaInfo from "./components/parainfo";
import NovelInfo from "./components/novelInfo";
import ParaRefer from "./components/reference";
import { getParagraphDetailApi } from "@/services/paragraph.service";
import { useQuery } from "@tanstack/react-query";
import { IParagraph } from "@/interface/schema/schema.interface";

export default function ParagraphDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const paraDetailQuery = useQuery<IParagraph>({
    queryKey: ["paraDetail", id],
    queryFn: async () => await getParagraphDetailApi(Number(id)),
  });

  return (
    <div className="py-4 h-full flex px-6 gap-8 hide-scroll">
      <div className="flex-1">
        <ParaInfo data={paraDetailQuery.data} />
      </div>
      <div className="flex flex-col gap-4 h-full">
        {paraDetailQuery.data?.novel && (
          <NovelInfo novelInfo={paraDetailQuery.data?.novel} />
        )}
        <ParaRefer references={paraDetailQuery.data?.references} />
      </div>
    </div>
  );
}
