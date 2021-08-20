import { AxiosRequestConfig } from 'axios';

/** 调用方/客户端请求参数，基础属性继承自 axios  */
export interface IRequestOption extends AxiosRequestConfig {
  query?: {
    [key: string]: any
  };
}

/** 调用方/客户端 FORM DATA 请求参数  */
export interface IRequestFormOption {
  url: string;
  data: Record<string, any>;
  query?: Record<string, any>;
  config?: AxiosRequestConfig;
}
