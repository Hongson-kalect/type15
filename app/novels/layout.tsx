import MainLayout from "@/layout/main";
import * as React from "react";

export interface INovelLayoutProps {
  children: React.ReactNode;
}

export default function NovelLayout(props: INovelLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
