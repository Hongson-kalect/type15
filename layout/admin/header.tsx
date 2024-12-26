import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Flame } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAppUser, ILanguage } from "@/interface/schema/schema.interface";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { changeLanguage } from "@/services/mainLayout.service";
import { mainLayoutStore } from "@/store/mainLayout.store";

type HeaderProps = {
  languages: ILanguage[];
  user?: IAppUser;
};
export const Header = ({ languages, user }: HeaderProps) => {
  const { data: session } = useSession();
  const { setUserInfo } = mainLayoutStore();

  const userLanguage = useMemo(() => {
    if (!user?.languageId) return languages?.[0];
    return languages.find((item) => item?.id === user?.languageId);
  }, [languages, user?.languageId]);

  const { mutate: handleChangeLanguage } = useMutation({
    mutationKey: ["changeLanguage"],
    mutationFn: (languageId: number) => changeLanguage(languageId, user?.id),
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });

  return (
    <div className="h-16  px-6 bg-white flex items-center justify-between w-full">
      <p className="text-xl font-bold">Kiểm tra tốc độ gõ</p>
      <div className="flex items-center gap-2">
        <div className="streak relative">
          <Flame color="red" />
          {/* <HiMiniFire size={32} className="text-red-600" /> */}
          <span
            className="absolute -top-0.5 -right-0.5 bg-white text-red-600 text-[10px] font-bold rounded-full h-3 px-0.5 flex items-center justify-center"
            style={{ border: "1px solid red" }}
          >
            20
          </span>
        </div>

        {userLanguage?.flag ? (
          <Image
            src={userLanguage.flag}
            width={60}
            height={40}
            alt="flag"
            className="bg-gray-400 rounded h-7 w-12"
          />
        ) : (
          <Skeleton className="rounded h-7 w-12" />
        )}

        {languages?.length > 0 ? (
          <Select
            value={userLanguage?.id.toString() || ""}
            onValueChange={(e) => handleChangeLanguage(Number(e))}
          >
            <SelectTrigger className="w-[120px] h-8 border-none outline-none !ring-0">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>

            <SelectContent>
              {languages?.map((item, index) => (
                <SelectItem key={index} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="rounded h-7 w-12" />
        )}

        <div
          className="user-info flex gap-2 cursor-pointer"
          onClick={() => {
            signIn("google");
          }}
        >
          <div className="flex items-center justify-center">
            {session?.user?.image ? (
              <Image
                className="bg-gray-400 rounded-full"
                src={session?.user?.image}
                width={40}
                height={40}
                alt="user"
              />
            ) : (
              <Skeleton className="rounded-full h-10 w-10" />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p className="user-name text-sm font-bold text-gray-800">
              {session?.user?.name || "Guest Account"}
            </p>
            <p className="text-gray-400 text-xs">
              {session?.user?.email || "Login to save progress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
