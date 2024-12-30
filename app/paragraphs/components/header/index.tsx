import * as React from "react";
import { FilterItem } from "./FilterItem";
import { User2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface IParagraphHeaderProps {}

export default function ParagraphHeader(props: IParagraphHeaderProps) {
  return (
    <div className="bg-white width-full rounded-lg flex items-center justify-between px-4 py-2">
      <div className="search relative">
        <Input
          className="h-8 w-72 font-medium text-gray-800"
          spellCheck={false}
          placeholder="Search..."
        />
        <div className="absolute"></div>
      </div>
      <div className="flex gap-4 filter">
        <div className="sort"></div>
        <div className="flex items-center gap-2">
          <FilterItem
            onClick={() => {}}
            active
            title="All"
            content=""
            icon={<User2 />}
          />
          <FilterItem
            onClick={() => {}}
            title="All"
            content=""
            icon={<User2 />}
          />
          <FilterItem
            onClick={() => {}}
            active
            title="All"
            content=""
            icon={<User2 />}
          />
        </div>
      </div>
    </div>
  );
}
