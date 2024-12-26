"use client";

import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { CommonSideBar } from "./sidebar";
import { getLanguages, getUser } from "@/services/mainLayout.service";
import { useSession } from "next-auth/react";
import { IAppUser } from "@/interface/schema/schema.interface";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: ILayoutProps) {
  const { data: session } = useSession();

  const user = useQuery<IAppUser>({
    queryKey: ["user", session],
    queryFn: () => getUser(session),
  });
  const languages = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages(),
  });

  console.log("user :>> ", user);
  console.log("languages :>> ", languages);

  return (
    <div className="flex h-screen w-screen">
      <div className="h-full">
        <CommonSideBar />
      </div>
      <div
        className="flex-1 flex flex-col h-full"
        style={{ background: "#d5ddff" }}
      >
        <Header user={user.data} languages={languages.data} />
        {props.children}
      </div>
    </div>
  );
}
