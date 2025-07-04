export interface IAppResponse<T> {
  data?: DBData<T>;
  success: boolean;
  kindMessage?: string;
}

export interface DBData<T> {
  item?: T;
  items?: T[];
  itemsCounter?: number;
  pagination?: Pagination;
  sorting?: Sorting;
}

export interface Pagination {
  page: number;
  size: number;
  totalItems?: number;
  totalPages?: number;
}

export interface Sorting {
  sort: "asc" | "desc";
  by: string;
}
export interface DBDataItemRequired<T> extends DBData<T> {
  item: T;
}

export interface DBDataItemsRequired<T> extends DBData<T> {
  items: T[];
}
