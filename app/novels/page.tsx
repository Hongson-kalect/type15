"use client";

import * as React from "react";
import NovelHeader from "./components/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ParaPagination from "./components/list/pagination";
import NovelList from "./components/list";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { NovelFilterType } from "@/interface/type/novel";
import { useQuery } from "@tanstack/react-query";
import {
  getNovelCountService,
  getNovelService,
} from "@/services/novel.service";

export default function NovelHeaderPage() {
  const { userInfo } = mainLayoutStore();
  const [filter, setFilter] = React.useState<NovelFilterType>({
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
    data: novels,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getNovels", filter],
    queryFn: async () => await getNovelService(filter),
  });

  const { data: novelCount } = useQuery({
    queryKey: [
      "paraCount",
      filter.favorite,
      filter.history,
      filter.self,
      filter.search,
    ],
    queryFn: async () => await getNovelCountService(filter),
  });

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, userId: userInfo?.id }));
  }, [userInfo]);

  return (
    <div className="py-4 flex-1 flex flex-col px-6 gap-4 hide-scroll">
      <NovelHeader filter={filter} setFilter={setFilter} />

      <div className="bg-white rounded-xl p-4 flex flex-1 flex-col gap-2">
        <div className="flex justify-between">
          <Link href="/novels/create">
            <Button>
              <Plus />
              Create
            </Button>
          </Link>
          <ParaPagination
            page={filter.page}
            setPage={(page) => setFilter((prev) => ({ ...prev, page }))}
            totalPage={novelCount}
          />
        </div>
        <div className="flex-1">
          <NovelList novels={novels} />
        </div>
      </div>
    </div>
  );
}
