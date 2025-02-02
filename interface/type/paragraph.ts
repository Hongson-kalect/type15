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

export type AddNovelParagraph = {
  novelId?: number;
  chapter: string;
  image: string;
  title: string;
  content: string;
  desc: string;
  ps: string;
  scope: "public" | "protected" | "private";
  protectedType: "pass" | "sell";
  password?: string;
  price?: number;
  priceUnitId?: number;
  languageId?: number;
  userId: number;
};

export type UserActionState = {
  like: number;
  isLiked: boolean;
  favorite: number;
  isFavorited: boolean;
  report: number;
  isReported: boolean;
};
export type UserAction = {
  action: "like" | "favorite" | "report";
  state: boolean;
  paragraphId: number;
  userId: number;
  reportType?: string;
  desc?: string;
};
