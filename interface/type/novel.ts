export type NovelFilterType = {
  search: string;
  orderColumn: string;
  orderType: string;
  page: number;
  userId?: number;
  favorite?: "1" | "";
  history?: "1" | "";
  self?: "1" | "";
};

export type AddNovelOption = {
  languageId: number;
  scope: "public" | "protected" | "private";
  protectedType?: "pass" | "sell";
  password?: string;
  price?: number;
  priceUnitId?: number;
  novelId?: number;
  chapter?: string;
};

export type AddNovelValue = {
  name: string;
  desc: string;
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
