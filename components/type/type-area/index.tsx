// import { scrollTo, scrollToId } from "@/app/libs/utils";
// import { useDebounce } from "@/hooks/useDebounce";
import { useDebounce } from "@/hooks/useDebounce";
import { ResultDetailType, ScoreType } from "@/interface/type/typing";
import { mainLayoutStore } from "@/store/mainLayout.store";
import * as React from "react";
import { calcuResult, getWord } from "../util";
import {
  addParagraphScore,
  addSpeedTestScore,
  addTrainingScore,
} from "@/services/type.service";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { scrollTo } from "@/lib/utils";
import { GrPowerReset } from "react-icons/gr";
import { WordList } from "./WordList";
import { Header } from "./Header";
// import { GrPowerReset } from "react-icons/gr";
// import { caculScore, getWord, pushScore } from "./_utils";
// import { Header } from "./Header";
// import { WordList } from "./WordList";
// import { IResult } from "../../types";
// import { useMainStore } from "@/layouts/main.store";
// import { UseQueryResult } from "@tanstack/react-query";
// import { calculateKeyResults } from "@/app/training/_utils/util";
// import { KeyResultType } from "@/app/training/ui/types";

export interface ITypeAreaProps {
  initPara?: string;
  rankQuery?: UseQueryResult<unknown>;
  setResult: (result: ResultDetailType) => void;
  isFinish: boolean;
  setIsFinish: (value: boolean) => void;
  isReset: boolean;
  setIsReset: (value: boolean) => void;
  page?: "training" | "speed-test" | "paragraph";
  targetId?: number;
}

export default function TypeArea({
  initPara,
  rankQuery,
  setResult,
  isFinish,
  setIsFinish,
  isReset,
  setIsReset,
  page,
  targetId,
}: ITypeAreaProps) {
  const { userInfo } = mainLayoutStore();

  const [paragraphs, setParagraphs] = React.useState(initPara || "");

  // const [userInput, setUserInput] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
  const paragraphsArray = React.useMemo(() => {
    return paragraphs.split(/[ \n]+/);
  }, [paragraphs]);
  const [userInputArr, setUserInputArr] = React.useState<string[]>([]);

  // const userInputArray = React.useMemo(() => {
  //   return userInput.split(" ");
  // }, [userInput]);
  const [typingWord, setTypingWord] = React.useState("");
  const wordDebounce = useDebounce(typingWord, 0);
  const [prevDebounce, setPrevDebounce] = React.useState("");

  const [deletedCount, setDeletedCount] = React.useState(0);
  const [initTime, setInitTime] = React.useState(100000);
  const [time, setTime] = React.useState(page === "speed-test" ? initTime : 0);
  const [isNextWord, setIsNextWord] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const {
    mutate: addScoreMutation,
    // error,
    // isLoading,
  } = useMutation({
    mutationKey: ["addScore"],
    mutationFn: async ({ score }: { score: ScoreType }) => {
      // const targetId =
      if (page === "speed-test") {
        const res = await addSpeedTestScore({ score, targetId });
        return res.data;
      }
      if (page === "paragraph") {
        const res = await addParagraphScore({ score, targetId });
        return res.data;
      }
      // if (page === "training") {
      const res = await addTrainingScore({ score, targetId });
      return res.data;
      // }
    },
    onSuccess: () => {
      if (rankQuery) rankQuery.refetch();
    },
  });

  const startTyping = () => {
    setIsTyping(true);
    setDeletedCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (page === "speed-test" && !prev) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        } else {
          return page === "speed-test" ? prev - 1 : prev + 1;
        }
      });
    }, 1000);
  };

  const onType = (value: string) => {
    if (!isTyping) startTyping();

    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      if (prevDebounce !== paragraphsArray[wordIndex]) {
        setDeletedCount(deletedCount + prevDebounce.length);
      }

      userInputArr[wordIndex] = value.slice(0, value.length - 1);
      setUserInputArr(userInputArr);
      setWordIndex(wordIndex + 1);
      setIsNextWord(true);
    } else {
      setTypingWord(value);
    }
  };

  const finishType = async () => {
    inputRef.current?.setAttribute("disabled", "disabled");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const result = calcuResult({
      correctArray: paragraphsArray.slice(0, wordIndex),
      userInputArray: userInputArr,
      failedCount: deletedCount,
      time: page === "speed-test" ? initTime : time,
    });

    setResult(result);

    //only push score when user is logged in change if need
    if (
      result.score.time &&
      result.score.score &&
      userInfo?.id &&
      Number(userInfo?.id) &&
      userInfo?.languageId
    ) {
      addScoreMutation({ score: result.score });
    }
    setIsFinish(true);
    // scrollToId("type-result");
  };

  const Reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(page === "speed-test" ? initTime : 0);
    setTypingWord("");
    setParagraphs(initPara || "");
    setUserInputArr([]);
    setWordIndex(0);
    setIsTyping(false);
    setIsFinish(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the h to top of window
    });
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
  };

  // React.useEffect(() => {
  //   if (initPara === undefined) {
  //     return;
  //   } else if (!initPara) {
  //     inputRef.current?.setAttribute("disabled", "disabled");
  //     return;
  //   } else {
  //     setParagraphs(initPara);
  //     inputRef.current?.removeAttribute("disabled");
  //     inputRef.current?.focus();
  //   }
  // }, [initPara]);

  React.useEffect(() => {
    if (isReset) {
      Reset();
      setIsReset(false);
    }
  }, [isReset]);

  React.useEffect(() => {
    if (page === "speed-test") {
      if (isTyping && !time) {
        finishType();
      }
    }
  }, [time, page]);

  React.useEffect(() => {
    if (!isFinish) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // setTime(type === "countDown" ? initTime : 0);
      setTypingWord("");
    }
  }, [isFinish]);

  React.useEffect(() => {
    if (page === "speed-test" && paragraphsArray.length <= wordIndex + 100) {
      const addText = getWord();
      setParagraphs((prev) => {
        if (prev) return prev + " " + addText;
        else return addText;
      });
    }
  }, [paragraphsArray, wordIndex]);

  React.useEffect(() => {
    setPrevDebounce(wordDebounce);

    if (isTyping) {
      if (isNextWord) return setIsNextWord(false);
      if (prevDebounce.length > wordDebounce.length) {
        setDeletedCount(
          deletedCount + (prevDebounce.length - wordDebounce.length)
        );
      }
    }
  }, [wordDebounce]);

  React.useEffect(() => {
    setTypingWord("");
    scrollTo("#char-" + wordIndex, ".words-wrapper");
    if (wordIndex >= paragraphsArray.length) {
      finishType();
    }
  }, [wordIndex]);

  React.useEffect(() => {
    if (initPara) setParagraphs(initPara);
  }, [initPara]);

  React.useEffect(() => {
    setTime(page === "speed-test" ? initTime : 0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`bg-white h-full rounded-lg flex flex-1 gap-4 duration-500 overflow-hidden ${
        isFinish ? "" : ""
      }`}
    >
      <div className={`w-2/3 h-full flex flex-col`}>
        <Header time={time} />
        <div
          className="relative bg-[#F5F6FA] px-4 py-3 rounded-lg flex-1 shadow-sm shadow-gray-300 "
          style={{ border: "1px solid #d8d8d8" }}
        >
          <div className="h-[150px] overflow-y-hidden words-wrapper">
            {/* <div className=""> */}
            <div
              className="text-2xl flex flex-wrap h-full text-gray-500"
              style={{ wordSpacing: "8px" }}
            >
              <div id="first-word"></div>
              <WordList
                typedArray={userInputArr}
                typingWord={wordDebounce}
                wordIndex={wordIndex}
                words={paragraphsArray}
              />
              <div className="h-[120px]"></div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="absolute top-12 left-1 right-1 h-[120px] bg-[#f6faffaa]"></div> */}
        </div>
        <div className="flex gap-8 items-center mt-6 justify-center">
          <textarea
            ref={inputRef}
            id="input-text"
            spellCheck={false}
            value={typingWord}
            onChange={(e) => onType(e.target.value)}
            className="disabled:bg-gray-200 disabled:text-gray-400 disabled:!border-none  text-center font-bold outline-none rounded-xl resize-none h-12 text-[#0C3690] !border-[#0C3690] flex items-center justify-center text-xl"
            rows={1}
            style={{ border: "2px solid #0C3690", lineHeight: "44px" }}
          />
          <button
            className="text-white flex h-12 rounded-lg bg-green-500 items-center px-4 gap-3 relative"
            onClick={Reset}
          >
            <GrPowerReset size={20} />
            <p>Reset</p>
          </button>
          <p className=" text-xs -bottom-4 left-0 text-center text-gray-400">
            <span>( F5 )</span>
          </p>
        </div>
      </div>
      <div className="flex-1 px-4" style={{ borderLeft: "1px solid #ddd" }}>
        <p>Bên lưu ghi mấy cái streak, animation, combo các thứ</p>
      </div>
    </div>
  );
}
