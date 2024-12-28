import { IScore } from "@/interface/schema/schema.interface";
import { ResultDetailType } from "@/interface/type/typing";
import { useMemo } from "react";

type IRankItemProps = {
  result: IScore;
  rank: number;
};

const RankItem = ({ result, rank }: IRankItemProps) => {
  return (
    <tr
      className="text-gray-700 [&_td]:py-2"
      style={{ border: "1px solid #eee" }}
    >
      <td className="text-sm">{rank}</td>
      <td
        className={`font-medium ${
          rank === 1 ? "font-medium text-lg" : "text-sm"
        } `}
      >
        {result.user?.username || "Guest"}
      </td>
      <td className="text-blue-600 font-medium">{result.wpm}</td>
      <td>{result.cpm}</td>
      <td className="text-sm text-green-500 italic">{result.wAccuracy}%</td>
      <td className="text-sm text-green-500 italic">{result.cAccuracy}%</td>
      <td className="text-lg font-bold">{result.score}</td>
      {/* <td>{attempt}</td> */}
    </tr>
  );
};

type IRankProps = {
  page: "training" | "speed-test" | "paragraph";
  resultDetail: ResultDetailType;
  ranks?: IScore[];
};

export const TypeRank = ({ resultDetail, page, ranks }: IRankProps) => {
  // const { userInfo } = useMainStore();
  const { result, score, keyResult } = useMemo(
    () => resultDetail,
    [resultDetail]
  );

  return (
    <div
      className="mt-8 bg-white rounded-lg px-6 py-4 flex gap-4"
      style={{ border: "1px solid #d5d5d5" }}
    >
      <div className="w-full">
        <h2 className=" text-gray-700 font-bold text-">XẾP HẠNG</h2>
        <table className="mt-6 min-w-[700px] w-5/6 text-center">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
              <th>Rank</th>
              <th>User Name</th>
              <th>WPM</th>
              <th>CPM</th>
              <th>WA</th>
              <th>CR</th>
              <th>Score</th>
              {/* <th>Attemp</th> */}
              {/* <th>total</th> */}
            </tr>

            {ranks?.map((rank, index) => (
              <RankItem result={rank} rank={index + 1} key={index} />
            ))}
            <tr
              className="text-gray-700 [&_td]:py-3 shadow-inner shadow-blue-400"
              style={{ border: "1px solid #eee" }}
            >
              <td colSpan={2} className=" font-bold">
                Điểm của bạn
              </td>
              <td className="text-blue-600 font-medium">{score?.wpm || 0}</td>
              <td>{score?.cpm || 0}</td>
              <td className="text-sm text-green-500 italic">
                {score?.wAccuracy || 0}%
              </td>
              <td className="text-sm text-green-500 italic">
                {score?.cAccuracy || 0}%
              </td>
              <td className="text-lg font-bold">{score?.score || 0}</td>
              {/* <td>5</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
