import MainLayout from "@/layout/main";
import * as React from "react";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export default function SpeedTestLayout(props: IDefaultLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
