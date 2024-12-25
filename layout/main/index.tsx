"use client";

import { Header } from "./header";
import { CommonSideBar } from "./sidebar";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: ILayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full">
        <CommonSideBar />
      </div>
      <div
        className="flex-1 flex flex-col h-full"
        style={{ background: "#d5ddff" }}
      >
        <Header />
        {props.children}
      </div>
    </div>
  );
}
