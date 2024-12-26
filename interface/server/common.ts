export type FilterDTO = {
  orderColumn?: string;
  orderType?: string;
  limit?: number;
  skip?: number;
  search?: string;
  [key: string]: unknown;
};
