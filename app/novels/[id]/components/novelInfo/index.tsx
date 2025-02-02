"use client";
import TypeArea from "@/components/type/type-area";
import { TypeRank } from "@/components/type/type-rank";
import { Result } from "@/components/type/type-result";
import { INovel, IScore } from "@/interface/schema/schema.interface";
import { ResultDetailType } from "@/interface/type/typing";
import { getScores } from "@/services/type.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronDown, Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import NovelOptions from "./options";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParaItem from "@/app/paragraphs/components/list/paraItem";
import ParagraphItem from "./ParagraphItem";
import { mainLayoutStore } from "@/store/mainLayout.store";
import ParaReferItem from "@/app/paragraphs/[id]/components/reference/paraReferItem";

const ItemInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-2 items-center mb-1 text-sm">
      <div className="text-gray-500 w-16 font-medium">{label}</div>
      <div className="text-gray-600">{value}</div>
    </div>
  );
};
export interface INovelInfoProps {
  novelInfo?: INovel;
}

export default function NovelInfo({ novelInfo }: INovelInfoProps) {
  const router = useRouter();
  const { userInfo } = mainLayoutStore();

  const [shortDesc, setShortDesc] = React.useState<boolean>(true);
  const [desc, setDesc] = React.useState<HTMLDivElement>(null);
  const descRef = React.useRef<HTMLDivElement>(null);

  const isDescOverflowing = React.useMemo(() => {
    if (!desc) return false;
    return desc.scrollHeight > desc.clientHeight;
  }, [novelInfo?.desc, desc]);

  console.log("descRef.current :>> ", descRef.current);
  console.log("desc :>> ", desc);

  React.useEffect(() => {
    if (descRef.current) {
      // Thực hiện hàm khi phần tử được gán vào ref
      console.log("Phần tử đã được gán vào ref:", descRef.current);
    }
  }, [descRef.current]);

  React.useEffect(() => {
    const div = document.querySelector(".description");
    console.log("div :>> ", div);
    if (div) setDesc(div as HTMLDivElement);
  }, [novelInfo]);

  if (!novelInfo) return <div>Loading...</div>;
  return (
    <div>
      <div
        onClick={() => router.push("/novels")}
        className="flex gap-2 items-center line-clamp-1 hover:w-full px-4 h-8 text-gray-500 italic hover:text-gray-800 hover:not-italic hover:-translate-x-4 duration-200"
      >
        <ArrowLeft />
        <div className="cursor-pointer text-lg font-medium">
          <div className="text-lg flex gap-3 font-medium text-gray-800">
            <div>{"Return"}</div>
          </div>
        </div>
      </div>

      <div
        className="bg-white px-4 py-3 rounded-xl flex gap-3"
        style={{ height: "calc(100dvh - 120px)" }}
      >
        <div className="infomation flex-1 flex flex-col h-full overflow-auto">
          <div className="h-40 flex gap-4">
            <Image
              src={
                novelInfo.image ||
                "https://img5.thuthuatphanmem.vn/uploads/2022/01/06/anh-tuyet-dep-anime-nu-ngau-lanh-lung_085606116.jpg"
              }
              alt="Book Image"
              className=" mb-2"
              width={220}
              height={150}
            />
            <div className="flex flex-col gap-2">
              <Link href={`/novels/${novelInfo.id}/add`}>
                <Button size="sm">
                  <Plus /> Add Chapter
                </Button>
              </Link>
              <Link href={`/novels/${novelInfo.id}/edit`}>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Pencil /> Edit Novel
                </Button>
              </Link>
              <Link href={`/novels/${novelInfo.id}/edit`}>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Trash /> Remove
                </Button>
              </Link>
            </div>
          </div>

          <ItemInfo label="Name" value={novelInfo.name} />
          <ItemInfo
            label="Author"
            value={
              novelInfo?.user?.user.name || novelInfo.user.profile.displayName
            }
          />
          <ItemInfo
            label="Publish"
            value={new Date(novelInfo.createdAt).toTimeString()}
          />
          <ItemInfo label="Progress" value={novelInfo.status} />
          <ItemInfo
            label="Chapter"
            value={novelInfo._count?.paragraphs?.toString() || "0"}
          />

          {novelInfo.paragraphs?.[0]?.id ? (
            <div className="flex gap-2 my-4">
              <Link href={`/paragraphs/${novelInfo.paragraphs?.[0].id}`}>
                <Button size="sm">Start first chapter</Button>
              </Link>
              <Link href={`/paragraphs/${novelInfo.paragraphs.at(-1).id}`}>
                <Button size="sm">Start last chapter</Button>
              </Link>
            </div>
          ) : null}

          <div className="px-2 pb-2 mt-3 text-sm text-gray-600 rounded shadow shadow-gray-400 flex overflow-auto flex-col flex-1">
            <div className="font-bold text-gray-600 underline">
              Description:
            </div>
            {/* {novelInfo.desc ? ( */}
            <div
              // ref={descRef}
              // style={{
              //   transition: "height 0.3s ease-in-out",
              //   height: shortDesc ? "120px" : desc.scrollHeight || "auto",
              // }}
              className={` description overflow-auto duration-500 flex-1 
               mt-1 ml-2`}
            >
              {novelInfo.desc}
            </div>
            {/* {isDescOverflowing ? (
              <div
                className="flex items-center justify-center pt-1 font-medium text-gray-400 gap-2"
                style={{ borderTop: "1px solid #ddd" }}
                onClick={() => setShortDesc(!shortDesc)}
              >
                {shortDesc ? <p>Xem hết</p> : <p>Thu gọn</p>}
                <ChevronDown
                  className={`${!shortDesc ? "rotate-180" : ""} duration-500`}
                />
              </div>
            ) : null} */}
            <div></div>
          </div>
        </div>

        <div
          className="h-full w-64 px-2"
          style={{ borderLeft: "1px solid #ccc" }}
        >
          <h3 className="underline text-lg font-medium text-gray-800">
            Chapter:
          </h3>
          <div className="flex flex-col gap-2 mt-2">
            {novelInfo.paragraphs?.map((item, index) => (
              <ParaReferItem paraInfo={item} key={index} />
              // <ParagraphItem paragraph={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 gap-4 hide-scroll rounded-xl">
        <div className="mt-6">
          <NovelOptions id={novelInfo.id} />
        </div>
      </div>
    </div>
  );
}
