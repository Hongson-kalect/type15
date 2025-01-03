import { Pagination, PaginationContent } from "@/components/ui/pagination";
import * as React from "react";

export interface IPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPage: number;
  limit?: number;
}

export default function ParaPagination({
  page,
  setPage,
  totalPage = 1,
  limit = 10,
}: IPaginationProps) {
  const lastPage = React.useMemo(() => {
    return Math.ceil(totalPage / limit);
  }, [totalPage, limit]);

  console.log("lastPage", lastPage);

  const renderPage = React.useMemo(() => {
    const arr = [];
    for (let i = 1; i <= lastPage; i++) {
      console.log("lastPage", i, lastPage);
      if (i < 5 && page > 5) {
        arr.push(i);
        continue;
      }
      if (i <= page + 2 && i > page - 2) {
        arr.push(i);
        continue;
      }
      if (i > lastPage - 2) {
        arr.push(i);
        continue;
      }
    }

    return arr;
  }, [lastPage]);

  console.log("renderPage", renderPage);
  return (
    <Pagination>
      <PaginationContent>
        {/* <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem> */}
      </PaginationContent>
    </Pagination>
  );
}
