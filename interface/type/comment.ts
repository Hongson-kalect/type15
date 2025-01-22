export type AddCommentType = {
  message: string;
  userId: number;
  targetField: "paragraphId" | "themeId" | "novelId"; // type of comment for
  targetColumn: number; // id of comment for
};
