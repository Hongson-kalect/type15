import * as React from "react";
import ParagraphHeader from "./components/header";
import ParaList from "./components/list";

export default function DefaultPage() {
  return (
    <div className="py-4 flex-1 px-6 overflow-auto">
      <ParagraphHeader />
      <ParaList />
    </div>
  );
}
