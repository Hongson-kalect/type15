"use client";
import TypeArea from "@/components/type/type-area";
import { TypeRank } from "@/components/type/type-rank";
import { Result } from "@/components/type/type-result";
import { IParagraph, IScore } from "@/interface/schema/schema.interface";
import { ResultDetailType } from "@/interface/type/typing";
import { getScores } from "@/services/type.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import ParaOptions from "./options";

export interface IParaInfoProps {
  data?: IParagraph;
}

export default function ParaInfo({ data }: IParaInfoProps) {
  const router = useRouter();
  const [isShowScore, setIsShowScore] = React.useState(false);
  const [resetType, setResetType] = React.useState(false);
  const [resultDetail, setResultDetail] = React.useState<ResultDetailType>(
    () => ({
      keyResult: [],
      score: undefined,
      typedResult: undefined,
    })
  );

  const rankQuery = useQuery<IScore[]>({
    queryKey: ["scores", data?.id],
    queryFn: async () => await getScores({ page: "paragraph", id: data?.id }),
  });

  if (!data) return <div>Loading...</div>;
  return (
    <div className="h-full flex flex-col gap-2">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center line-clamp-1 hover:w-full px-4 h-8 text-gray-500 italic hover:text-gray-800 hover:not-italic hover:-translate-x-4 duration-200"
      >
        <ArrowLeft />
        <div className="cursor-pointer text-lg font-medium">
          <div className="text-lg flex gap-3 font-medium text-gray-800">
            {data?.chapter ? data.chapter : null}
            {/* <div>Chapter 12:</div> */}
            <div>{data?.title}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 gap-4 hide-scroll rounded-xl">
        <div className=" rounded-xl w-full">
          <div
            className={`overflow-hidden duration-200 rounded-xl bg-white ${
              isShowScore ? "h-0" : "h-[320px] mb-8 p-4"
            }`}
          >
            <TypeArea
              isFinish={isShowScore}
              setIsFinish={setIsShowScore}
              // timeType="countDown"
              setResult={setResultDetail}
              isReset={resetType}
              setIsReset={setResetType}
              initPara={data.content}
              page="paragraph"
              rankQuery={rankQuery}
              targetId={data.id}
            />
          </div>

          {/* <div>{JSON.stringify(data)}</div>  */}
        </div>

        <div className="duration-200" id="type-result">
          {resultDetail.score !== null ? (
            <div
              className={` rounded-lg ${
                !isShowScore
                  ? "opacity-30"
                  : "shadow-lg border-blue-200 border-solid border-2"
              }`}
            >
              <Result
                resultDetail={resultDetail}
                reset={() => setResetType(true)}
              />
            </div>
          ) : null}
        </div>

        <TypeRank
          ranks={rankQuery.data}
          resultDetail={resultDetail}
          page="speed-test"
        />

        <div className="mt-6">
          <ParaOptions />
        </div>
      </div>
    </div>
  );
}
