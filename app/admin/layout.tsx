import AdminLayout from "@/layout/admin";
import * as React from "react";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout(props: IDefaultLayoutProps) {
  return <AdminLayout>{props.children}</AdminLayout>;
}
