export type GetDTO = {
  orderColumn?: string;
  orderType?: string;
  page?: number;
  limit?: number;
  // skip?: number;
  search?: string;
  [key: string]: any;
};
