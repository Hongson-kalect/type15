import * as React from "react";
import { FilterItem } from "./FilterItem";
import { ArrowDown, ArrowUp, Hand, Heart, Plus, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParagraphFilterType } from "@/interface/type/paragraph";
import { useDebounce } from "@/hooks/useDebounce";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface IParagraphHeaderProps {
  filter: ParagraphFilterType;
  setFilter: React.Dispatch<React.SetStateAction<ParagraphFilterType>>;
}

export default function ParagraphHeader({
  filter,
  setFilter,
}: IParagraphHeaderProps) {
  const { userInfo } = mainLayoutStore();

  const [search, setSearch] = React.useState<string>("");
  const searchDebounce = useDebounce(search, 500);
  const sortValue = React.useMemo(
    () => filter.orderColumn + "_" + filter.orderType,
    [filter.orderColumn, filter.orderType]
  );
  const onChangeSort = (value: string) => {
    const [column, type] = value.split("_");
    setFilter((prev) => ({ ...prev, orderColumn: column, orderType: type }));
  };

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, search: searchDebounce }));
  }, [searchDebounce]);
  return (
    <div className="bg-white width-full rounded-lg flex items-center justify-between px-4 py-2">
      <div className="search relative">
        <Input
          className="h-8 w-72 font-medium text-gray-800"
          spellCheck={false}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute"></div>
      </div>
      <div className="flex gap-4 filter">
        <div className="sort">
          <Select
            value={sortValue}
            onValueChange={(value) => onChangeSort(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort" defaultValue="createdAt_desc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt_desc">
                <div className="flex gap-2 items-center">
                  <p>Add Time</p>
                  <ArrowDown size={18} color="#444" />
                </div>
              </SelectItem>
              <SelectItem value="createdAt_asc">
                <div className="flex gap-2 items-center">
                  <p>Add Time</p>
                  <ArrowUp size={18} color="#444" />
                </div>
              </SelectItem>
              <SelectItem value="completed_desc">
                <div className="flex gap-2 items-center">
                  <p>Top View</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <FilterItem
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                favorite: prev.favorite ? "" : "1",
              }));
            }}
            active={!!filter.favorite}
            title="Favorited paragraphs"
            content=""
            icon={<Heart />}
          />
          <FilterItem
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                history: prev.history ? "" : "1",
              }));
            }}
            active={!!filter.history}
            title="Typed paragraphs"
            content=""
            icon={<Hand />}
          />
          {userInfo?.id && (
            <FilterItem
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  self: prev.self ? "" : "1",
                }));
              }}
              active={!!filter.self}
              title="Your paragraphs"
              content=""
              icon={<User2 />}
            />
          )}
        </div>
      </div>
    </div>
  );
}
