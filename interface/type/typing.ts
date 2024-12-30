export type KeyResultType = {
  char: string;
  total: number;
  accuracy: number;
};

export type ScoreType = {
  score: number;
  time: number;
  wpm: number;
  cpm: number;
  wAccuracy: number;
  cAccuracy: number;
};

export type ResultType = {
  correctWords: number;
  failWords: number;
  totalWords: number;
  correctChars: number;
  failChars: number;
  totalChars: number;
  time: number;
};

export type ResultDetailType = {
  score?: ScoreType;
  typedResult?: ResultType;
  keyResult?: KeyResultType[];
};
