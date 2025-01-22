export type MessageType = {
  content: string;
  userId: number;
  targetField: "paragraphId" | "themeId" | "novelId";
  targetColumn: number;
  createdAt?: Date;
  state?: "sending" | "success" | "error";
};
