export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IPage<T> {
  items: T[];
  total: number;
}
