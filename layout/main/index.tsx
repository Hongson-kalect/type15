"use client";

import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { CommonSideBar } from "./sidebar";
import { getLanguages, getUser } from "@/services/mainLayout.service";
import { useSession } from "next-auth/react";
import { IAppUser } from "@/interface/schema/schema.interface";
import { mainLayoutStore } from "@/store/mainLayout.store";
import React from "react";
import { setLocalStorage } from "@/lib/localStorage";
import { storage } from "@/constant/localStorage";
import { setCookie } from "@/lib/cookies";
import { cookie } from "@/constant/cookie";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: ILayoutProps) {
  const { data: session } = useSession();
  const { setUserInfo } = mainLayoutStore();

  const user = useQuery<IAppUser>({
    queryKey: ["user", session],
    queryFn: () => getUser(session),
  });
  const languages = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages(),
  });

  React.useEffect(() => {
    console.log("user.data :>> ", user.data);
    console.log("session :>> ", session);
    if (user.data) {
      setLocalStorage(storage.user, user.data);
      setUserInfo(user.data);
    }

    if (user.data?.access_token)
      setCookie(cookie.access_token, user.data?.access_token);
  }, [user.data]);

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
