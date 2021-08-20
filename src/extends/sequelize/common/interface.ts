import { IHttpRequestPage } from '@/common';
import { FindAndCountOptions } from 'sequelize';

/** 分页查询条件 */
export interface IHttpResponsePaginatedOption extends FindAndCountOptions {
  page: IHttpRequestPage;
}
