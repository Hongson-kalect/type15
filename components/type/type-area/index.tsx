// import { scrollTo, scrollToId } from "@/app/libs/utils";
// import { useDebounce } from "@/hooks/useDebounce";
import { useDebounce } from "@/hooks/useDebounce";
import { KeyResultType, ResultType, ScoreType } from "@/interface/type/typing";
import { mainLayoutStore } from "@/store/mainLayout.store";
import * as React from "react";
import { calcuResult } from "../util";
import { addScore, addSpeedTestScore } from "@/services/type.service";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
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
  timeType?: "countDown" | "countUp";
  rankQuery: UseQueryResult<unknown>;
  setResult: (result: {
    keyResult: KeyResultType[];
    score: ScoreType;
    typedResult: ResultType;
  }) => void;
  setKeyResult: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
  isFinish: boolean;
  setIsFinish: (value: boolean) => void;
  isReset: boolean;
  setIsReset: (value: boolean) => void;
  page?: "training" | "speed-test" | "paragraph";
}

export default function TypeArea({
  initPara,
  timeType,
  rankQuery,
  setResult,
  setKeyResult,
  isFinish,
  setIsFinish,
  isReset,
  setIsReset,
  page,
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
  const [initTime, setInitTime] = React.useState(60000);
  const [time, setTime] = React.useState(
    timeType === "countDown" ? initTime : 0
  );
  const [isNextWord, setIsNextWord] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const {
    data: addScore,
    error,
    isLoading,
  } = useMutation(addScore, {
    onSuccess: (data) => {
      onSucess;
    },
    onError: (error) => {
      onError;
    },
  });

  const startTyping = () => {
    setIsTyping(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (timeType === "countDown" && !prev) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        } else {
          return timeType === "countDown" ? prev - 1 : prev + 1;
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
      time: timeType === "countDown" ? initTime : time,
    });

    setResult(result);
    ///////////Ở đây aaaaaaaaaaaaaaaaaaaaaaaa

    //only push score when user is logged in change if need
    if (userInfo?.id && Number(userInfo?.id) && userInfo?.language?.id) {
      console.log("clmm cái này ở đou");
      await addSpeedTestScore({
        score: result.score,
      });
      await rankQuery.refetch();
    }
    setIsFinish(true);
    // scrollToId("type-result");
  };

  const Reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(timeType === "countDown" ? initTime : 0);
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

  React.useEffect(() => {
    if (initPara === undefined) {
      return;
    } else if (!initPara) {
      inputRef.current?.setAttribute("disabled", "disabled");
      return;
    } else {
      setParagraphs(initPara);
      inputRef.current?.removeAttribute("disabled");
      inputRef.current?.focus();
    }
  }, [initPara]);

  React.useEffect(() => {
    if (isReset) {
      Reset();
      setIsReset(false);
    }
  }, [isReset]);

  React.useEffect(() => {
    if (timeType === "countDown") {
      if (isTyping && !time) {
        finishType();
      }
    }
  }, [time, timeType]);

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
    if (initPara === undefined && paragraphsArray.length <= wordIndex + 100) {
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
        setFailCount(failCount + (prevDebounce.length - wordDebounce.length));
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
    setTime(timeType === "countDown" ? initTime : 0);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className={`bg-white rounded-lg mt-4 flex gap-4 duration-500 overflow-hidden ${
        isFinish ? "h-0 min-h-0 mt-0" : "h-[300px]"
      }`}
    >
      <div className={`w-2/3 px-6 py-5 shadow-sm shadow-gray-300`}>
        <Header time={time} />
        <div
          className="relative bg-[#F5F6FA] px-4 py-3 rounded-lg shadow-sm shadow-gray-300 "
          style={{ border: "1px solid #d8d8d8" }}
        >
          <div className="h-[120px] overflow-y-hidden words-wrapper">
            {/* <div className=""> */}
            <div
              className="text-2xl flex flex-wrap h-full"
              style={{ wordSpacing: "8px" }}
            >
              <div id="first-word"></div>
              <WordList
                typedArray={userInputArray}
                typingWord={wordDebounce}
                wordIndex={wordIndex}
                words={paragraphsArray}
              />
            </div>
            {/* </div> */}
          </div>
          <div className="absolute top-12 left-1 right-1 h-[90px] bg-[#f6faffaa]"></div>
        </div>
        <div className="flex gap-8 items-center mt-6">
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

            <p className="absolute text-xs -bottom-4 w-full left-0 text-center text-gray-400">
              <span>( F5 )</span>
            </p>
          </button>
        </div>
      </div>
      <div className="flex-1 px-4" style={{ borderLeft: "1px solid #ddd" }}>
        <p>Bên lưu ghi mấy cái streak, animation, combo các thứ</p>
      </div>
    </div>
  );
}