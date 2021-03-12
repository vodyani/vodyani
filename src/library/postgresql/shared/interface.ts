import { FindAndCountOptions } from './type';

export interface Conditions<T> {
  operator?: any;
  fuzzySearch?: boolean;
  attributes?: Array<keyof T>;
}

export interface PaginationResult<T = any> {
  rows?: T[];
  pagination?: {
    page: number;
    pageSize: number;
    count: number;
    pageCount: number;
  };
}

export interface FindPaginationOptions extends FindAndCountOptions {
  pagination: {
    page: number;
    pageSize: number;
    order: string;
  };
}
