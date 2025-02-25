import * as React from "react";
import { useTrainingStore } from "@/store/training.store";
import TypeArea from "@/components/type/type-area";
import { Result } from "@/components/type/type-result";
import { ResultDetailType } from "@/interface/type/typing";
import TrainingQuill from "./training-quill";
import TrainingModify from "./add-form";

export default function TrainingMain() {
  const { selectedTraining, isAdd } = useTrainingStore();

  const [isShowScore, setIsShowScore] = React.useState(false);
  const [resetType, setResetType] = React.useState(false);
  const [resultDetail, setResultDetail] = React.useState<ResultDetailType>(
    () => ({
      keyResult: [],
      score: undefined,
      typedResult: undefined,
    })
  );

  return <TrainingModify />;

  if (!selectedTraining)
    return (
      <div className="bg-white px-2 py-1 overflow-auto flex-1 rounded-lg h-full">
        Hướng dẫn or lời nói đầu or Không có cái nào đc chọn
      </div>
    );

  return (
    <div className="bg-gray-100 px-2 py-1 overflow-auto flex-1 rounded-lg h-full">
      <div className="text-lg font-bold text-gray-800">
        {"Training - "}
        <span className="text-base text-gray-500">
          {selectedTraining.title}
        </span>
      </div>
      {!selectedTraining.content ? null : (
        <TypeArea
          // rankQuery={rankQuery}
          isReset={resetType}
          setIsReset={setResetType}
          setResult={setResultDetail}
          isFinish={isShowScore}
          setIsFinish={setIsShowScore}
          initPara={selectedTraining.content}
          page="training"
          language="alphabet"
        />
        // <TypeArea page="training" initPara={selectedTraining.content} />
      )}

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

      {!selectedTraining?.qill ? null : (
        <TrainingQuill quill={selectedTraining.qill} />
      )}

      {/* <div>{JSON.stringify(selectedTraining, null, 2)}</div> */}
    </div>
  );
}
