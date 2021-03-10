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

export interface HttpStatusOptions {
  language?: 'zh' | 'en';
  status?: Map<number, StatusInfo>;
}

export interface StatusInfo {
  zh: string;
  en: string;
  code: number;
  errorCode: number;
}
