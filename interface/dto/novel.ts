export type CreateNovelDTO = {
  name: string;
  image?: string;
  desc: string;
  // ps: string;
  languageId: number;
  scope: "public" | "protected" | "private";
  password?: string;
  price?: number;
  priceUnitId?: number;
  userId: number;
};
