export interface RequestPagination {
  page: number;
  pageSize: number;
  order: string;
}

export interface ResponseBody<T> {
  data: T;
  code: number;
  errorCode: number;
  message: string;
  requestId: string;
  timestamp: number;
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
