export interface ResponseBody<T> {
  data: T;
  code: number;
  errorCode: number;
  message: string;
  requestId: string;
  timestamp: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  order: string;
}

export interface HttpStatusConstantInfo {
  zh: string;
  en: string;
  code: number;
  errorCode: number;
}

export interface HttpStatusConstant {
  language?: 'zh' | 'en';
  status?: Map<number, HttpStatusConstantInfo>;
}
