import { RequestPagination } from '@common/interface';

import { FindAndCountOptions } from './type';

export interface Conditions<T> {
  operator?: any;
  fuzzySearch?: boolean;
  attributes?: Array<keyof T>;
}

export interface FindPaginationOptions extends FindAndCountOptions {
  pagination: RequestPagination;
}

export interface PaginationInfo{
  page: number;
  pageSize: number;
  count: number;
  pageCount: number;
}

export interface PaginationResult<T = any> {
  pagination?: PaginationInfo;
  rows?: T[];
}
