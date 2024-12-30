import { Button } from "@/components/ui/button";
import { ResultDetailType } from "@/interface/type/typing";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const ResultItem = ({
  name,
  result,
  italic = false,
}: {
  name: string;
  result: string | ReactNode;
  italic?: boolean;
}) => (
  <div className="">
    <p className="text-sm text-gray-600 mt-3">{name}</p>
    <p
      className={`font-semibold text-3xl mt-2 text-center ${
        italic ? "italic" : ""
      }`}
    >
      {result}
    </p>
  </div>
);

const renderAccuracyBar = (accuracy: number, total: number) => {
  const percentage = (accuracy / total) * 100;

  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 w-16 text-right">
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
};

export const Result = ({
  resultDetail,
  reset,
}: {
  resultDetail: ResultDetailType;
  reset: () => void;
}) => {
  const [showKeyStats, setShowKeyStats] = useState(false);
  const { score, keyResult, typedResult } = useMemo(() => {
    return resultDetail;
  }, [resultDetail]);

  return (
    <div
      className="bg-white rounded-lg px-6 py-4"
      id="type-score"
      style={{ border: "1px solid #ddd" }}
    >
      <div className="flex flex-col">
        <h2 className="text-orange-500 font-bold text-2xl">KẾT QUẢ</h2>

        <div className="flex gap-4 mt-4">
          {/* Kết quả chi tiết */}
          <div className="flex-[2]">
            <div className="detail grid grid-cols-3 flex-wrap gap-8 pl-4 max-w-[560px]">
              <ResultItem
                name="Số từ đã gõ"
                result={
                  <>
                    <span>{typedResult?.totalWords || 0}</span>
                    <span className="text-sm text-red-400">
                      ({typedResult?.failWords || 0})
                    </span>
                  </>
                }
              />

              <ResultItem name="Số chữ / phút" result={score?.wpm || 0} />
              <ResultItem
                name="Tỉ lệ đúng"
                result={score?.wAccuracy || 0}
                italic
              />

              <ResultItem
                name="Số ký tự đã gõ"
                result={
                  <>
                    <span>{typedResult?.totalChars || 0}</span>
                    <span className="text-sm text-red-400">
                      ({typedResult?.failChars || 0})
                    </span>
                  </>
                }
              />

              <ResultItem name="Số ký tự / phút" result={score?.cpm || 0} />
              <ResultItem
                name="Tỉ lệ đúng"
                result={score?.cAccuracy || 0}
                italic
              />
            </div>
          </div>

          {/* Điểm số */}
          <div
            className="flex-1 flex flex-col pl-4"
            style={{ borderLeft: "1px solid #ddd" }}
          >
            <h2 className="text-blue-500 font-bold text-2xl">ĐIỂM</h2>
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="point text-5xl font-bold">{score?.score}</p>
              <p className="point text-xl text-cyan-500 italic font-bold mt-6">
                Excelent
              </p>
            </div>
          </div>
        </div>

        {/* Thống kê phím - có thể collapse */}
        <div className="mt-8 border-t pt-4">
          <button
            onClick={() => setShowKeyStats(!showKeyStats)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <h3 className="font-semibold">Chi tiết phím</h3>
            {showKeyStats ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <div
            className={`grid grid-cols-2 gap-2 mt-2 overflow-hidden transition-all duration-300 ${
              showKeyStats ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {keyResult?.length &&
              keyResult.map((key, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <span className="font-bold w-6 text-center">{key.char}</span>
                  {renderAccuracyBar(key.accuracy, key.total)}
                  <span className="text-xs text-gray-500">
                    ({key.accuracy}/{key.total})
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Nút Reset */}
        <div className="mt-8">
          <Button
            className="h-14 bg-green-500 hover:bg-green-700 text-lg w-full"
            onClick={reset}
          >
            <GrPowerReset size={20} className="mr-2" /> Thử lại
          </Button>
        </div>
      </div>
    </div>
  );
};
