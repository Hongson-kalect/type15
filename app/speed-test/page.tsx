"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultDetailType } from "@/interface/type/typing";
import TypeArea from "@/components/type/type-area";
import { Result } from "@/components/type/type-result";
import { TypeRank } from "@/components/type/type-rank";
import { getScores } from "@/services/type.service";
import { IScore } from "@/interface/schema/schema.interface";

const SpeedTest = () => {
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
    queryKey: ["scores"],
    queryFn: async () => await getScores({ page: "speed-test" }),
  });

  return (
    <div className=" p-4 pt-8 flex-1 px-6 overflow-auto" id="speed-test-page">
      <div
        className={`overflow-hidden duration-200 ${
          isShowScore ? "h-0" : "h-[400px] mb-8"
        }`}
      >
        <div className={`bg-white rounded-xl px-4 py-6 h-full`}>
          <TypeArea
            rankQuery={rankQuery}
            isReset={resetType}
            setIsReset={setResetType}
            setResult={setResultDetail}
            isFinish={isShowScore}
            setIsFinish={setIsShowScore}
            page="speed-test"
          />
        </div>
      </div>

      <div className="duration-200" id="type-result">
        {resultDetail.score !== null ? (
          <div
            className={` rounded-lg ${
              !isShowScore
                ? "opacity-30"
                : "shadow-xl border-blue-400 border-solid border-2 shadow-blue-500"
            }`}
          >
            <Result
              resultDetail={resultDetail}
              reset={() => setResetType(true)}
            />
          </div>
        ) : null}
      </div>

      <div className="" id="type-rank">
        <TypeRank
          ranks={rankQuery.data}
          resultDetail={resultDetail}
          page="speed-test"
        />
      </div>
    </div>
  );
};

export default SpeedTest;
