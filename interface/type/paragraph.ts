export type ParagraphFilterType = {
  search: string;
  orderColumn: string;
  orderType: string;
  page: number;
  userId?: number;
  favorite?: "1" | "";
  history?: "1" | "";
  self?: "1" | "";
};

export type AddParagraphOption = {
  languageId: number;
  scope: "public" | "protected" | "private";
  protectedType?: "pass" | "sell";
  password?: string;
  price?: number;
  priceUnitId?: number;
  novelId?: number;
  chapter?: string;
};

export type AddParagraphValue = {
  title: string;
  content: string;
  desc: string;
  ps: string;
};