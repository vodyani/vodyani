import { IRequestPage } from '@/common';
import { FindAndCountOptions } from 'sequelize';

export interface IBaseEntity {
  id?: number | string;
  createdTime?: Date;
  updatedTime?: Date;
}

export interface IResponsePaginatedOption extends FindAndCountOptions {
  page: IRequestPage;
}
