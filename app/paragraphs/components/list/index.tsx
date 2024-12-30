import * as React from "react";
import ParaListTable from "./table";

export interface IParaListProps {}

export default function ParaList(props: IParaListProps) {
  return (
    <div>
      <ParaListTable />
    </div>
  );
}
