export type CreateParagraphDTO = {
  title: string;
  content: string;
  description: string;
  ps: string;
  languageId: number;
  scope: "public" | "protected" | "private";
  password?: string;
  price?: number;
  priceUnitId?: number;
  chapter?: string;
  novelId?: number;
  userId: number;
};
