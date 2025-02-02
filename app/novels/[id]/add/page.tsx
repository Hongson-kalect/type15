"use client";

import { INovel } from "@/interface/schema/schema.interface";
import { getNovelDetailService } from "@/services/novel.service";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import NovelInfo from "./components/novel-info";
import NovelParagraphList from "./components/para-list";
import CreateNovelParaForm from "./components/create-form";

export interface IAddNovelChapterProps {
  params: Promise<{ id: string }>;
}

export default function AddNovelChapter({ params }: IAddNovelChapterProps) {
  const { id } = React.use(params);

  const { data: novelDetail } = useQuery<INovel>({
    queryKey: ["novelDetail", id],
    queryFn: async () => await getNovelDetailService(Number(id)),
  });

  return (
    <div className="py-4 h-full flex px-6 gap-8">
      <div className="flex-1">
        <CreateNovelParaForm novelDetail={novelDetail} novelId={id} />
      </div>
      <div className="flex flex-col gap-4 w-[300px]">
        <NovelInfo novelInfo={novelDetail} />
        <NovelParagraphList novelParagraphList={novelDetail?.paragraphs} />
      </div>
    </div>
  );
}
