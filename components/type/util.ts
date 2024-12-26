import { KeyResultType } from "@/interface/type/typing";

// export const calculateKeyResults = ({
//   paraArr,
//   userInputArr,
//   setKeyResult,
// }: {
//   paraArr: string[];
//   userInputArr: string[];
//   setKeyResult: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
// }) => {
//   let correctChar = 0,
//     correctWord = 0,
//     failChar = 0,
//     failWord = 0;

//   const tempResult: KeyResultType[] = [];

//   paraArr.forEach((word, index) => {
//     word.split("").forEach((char, charIndex) => {
//       let keyIndex = tempResult.find((key) => key.char === char);
//       if (!keyIndex) {
//         keyIndex = { char, total: 0, accuracy: 0 };
//         tempResult.push(keyIndex);
//       }

//       keyIndex.total += 1;
//       if (userInputArr?.[index]?.[charIndex] === char) {
//         keyIndex.accuracy += 1;
//       }
//     });
//     if (userInputArr?.[index] === word) {
//       correctChar += word.length;
//       correctWord += 1;
//     } else {
//       failChar += word.length;
//       failWord += 1;
//     }
//   });

//   setKeyResult(
//     tempResult
//       .sort((a, b) => a.char.localeCompare(b.char))
//       .sort((a, b) => b.total - a.total)
//   );

//   return {
//     keyResult: tempResult,
//     result: {
//       correctChar,
//       correctWord,
//       failChar,
//       failWord,
//     },
//     correctChar,
//     correctWord,
//     failChar,
//     failWord,
//   };
// };

// export const caculScore = ({
//   failCount,
//   wordIndex,
//   paragraphsArray,
//   userInputArray,
//   initTime,
// }: {
//   failCount: number;
//   wordIndex: number;
//   paragraphsArray: string[];
//   userInputArray: string[];
//   initTime: number;
// }) => {
//   const initResult: IResult = {
//     wordTyped: 0,
//     charTyped: 0,
//     wordCorrect: 0,
//     charCorrect: 0,
//     wordError: 0,
//     charError: 0,
//     wpm: 0,
//     cpm: 0,
//     wAccuracy: 0,
//     cAccuracy: 0,
//     score: 0,
//   };

//   initResult.charError = wordIndex ? failCount : 0;

//   const correctWords = paragraphsArray.slice(0, wordIndex);
//   userInputArray.pop(); //remove last space
//   initResult.wordTyped = wordIndex;
//   userInputArray.map((typedWord, index) => {
//     const correctWord = correctWords[index];
//     const isCorrect = typedWord === correctWord;

//     if (isCorrect) {
//       initResult.wordCorrect += 1;
//       initResult.charCorrect += correctWord.length;
//     } else {
//       initResult.wordError += 1;
//       for (
//         let i = 0;
//         i < Math.max(correctWord?.length, typedWord?.length);
//         i++
//       ) {
//         if (correctWord[i] !== typedWord[i]) {
//           initResult.charError += 1;
//         } else {
//           initResult.charCorrect += 1;
//         }
//       }
//     }
//   });

//   initResult.wordTyped = userInputArray.length;
//   initResult.charTyped = wordIndex ? userInputArray.join("").length : 0;

//   initResult.wpm = Math.floor(initResult.wordCorrect / (initTime / 60));
//   initResult.cpm = Math.floor((initResult.charCorrect / initTime) * 60);
//   initResult.wAccuracy = initResult.wordTyped
//     ? Math.floor((initResult.wordCorrect / initResult.wordTyped) * 10000) / 100
//     : 0;
//   initResult.cAccuracy = initResult.charTyped
//     ? Math.floor((initResult.charCorrect / initResult.charTyped) * 10000) / 100
//     : 0;
//   initResult.score =
//     Math.floor(
//       Math.sqrt(
//         (initResult.wordCorrect *
//           initResult.charCorrect *
//           initResult.wAccuracy *
//           initResult.cAccuracy) /
//           (initTime || 1)
//       )
//     ) / 10;
//   return initResult;
// };

type CalcuResultProps = {
  correctArray: string[];
  userInputArray: string[];
  failedCount: number;
  time: number;
};

export const calcuResult = ({
  correctArray,
  userInputArray,
  failedCount,
  time,
}: CalcuResultProps) => {
  const totalWords = correctArray.length;
  const totalChars = correctArray.join("").length;
  const keyResult: KeyResultType[] = [];

  let correctWords = 0;
  let failWords = 0;
  let correctChars = 0;
  let failChars = failedCount;

  correctArray.map((correctWord, index) => {
    const typedWord = userInputArray[index];
    if (typedWord === correctWord) {
      correctWords += 1;
      correctChars += correctWord.length;
    } else {
      failWords += 1;
      for (let i = 0; i < Math.max(correctWord.length, typedWord.length); i++) {
        if (correctWord[i] !== typedWord[i]) {
          failChars += 1;
        } else {
          correctChars += 1;
        }
      }
    }

    for (let i = 0; i < Math.max(correctWord.length, typedWord.length); i++) {
      const char = correctWord[i];
      const typedChar = typedWord[i];

      if (!char) continue;

      let key = keyResult.find((item) => item.char === char);
      if (!key) {
        key = {
          char,
          total: 0,
          accuracy: 0,
        };
        keyResult.push(key);
      }
      key.total += 1;

      if (char === typedChar) {
        key.accuracy += 1;
      }
    }
  });

  const wpm = Math.floor((correctWords / time) * 60);
  const cpm = Math.floor((correctChars / time) * 60);

  const wAccuracy = Math.floor((correctWords / totalWords) * 10000) / 100;
  const cAccuracy = Math.floor((correctChars / totalChars) * 10000) / 100;

  const score =
    Math.floor(
      Math.sqrt(
        (correctWords * correctChars * wAccuracy * cAccuracy) / (time || 1)
      )
    ) / 10;

  return {
    score: {
      score,
      wpm,
      cpm,
      wAccuracy,
      cAccuracy,
      time,
    },
    typedResult: {
      correctWords,
      failWords,
      totalWords,
      correctChars,
      failChars,
      totalChars,
      time,
    },
    keyResult: keyResult,
  };
};
