export type ParagraphFilterType = {
  search: string;
  orderColumn: string;
  orderType: string;
  page: number;
  userId?: number;
  favorite?: boolean;
  history?: boolean;
  self?: boolean;
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
