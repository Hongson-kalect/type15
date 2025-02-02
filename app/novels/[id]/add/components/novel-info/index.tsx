import { INovel } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

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
  if (!novelInfo)
    return <div className="bg-white px-4 py-3 h-full rounded-xl">No data</div>;
  return (
    <div className="bg-white px-4 py-3 rounded-xl">
      <p className="text-gray-800 text-lg font-medium line-clamp-2">
        {novelInfo?.name}
      </p>
      <div className="h-40 flex gap-4 my-2">
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
      </div>
      <ItemInfo label="Name" value={novelInfo.name} />
      <ItemInfo
        label="Author"
        value={novelInfo?.user?.user.name || novelInfo.user.profile.displayName}
      />
      <ItemInfo
        label="Publish"
        value={relativeDate(new Date(novelInfo.createdAt))}
      />
      <ItemInfo label="Progress" value={novelInfo.status} />
      <ItemInfo
        label="Chapter"
        value={novelInfo._count?.paragraphs?.toString() || "0"}
      />
    </div>
  );
}
