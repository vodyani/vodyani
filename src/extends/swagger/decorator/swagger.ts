import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { HttpResponseBodyBO, HttpResponsePageBO } from '../common';

/** 返回单条 BO/业务数据对象 */
export const ApiResponseBO = <T extends Type<any>>(BO?: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponseBodyBO) },
          {
            properties: {
              data: BO
                ? { $ref: getSchemaPath(BO) }
                : { type: 'object' },
            },
          },
        ],
      },
    }),
  );
};

/** 返回多条 BO/业务数据对象 */
export const ApiListResponseBO = <T extends Type<any>>(BO?: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponseBodyBO) },
          {
            properties: {
              data: BO
                ? { type: 'array', $ref: getSchemaPath(BO) }
                : { type: 'object' },
            },
          },
        ],
      },
    }),
  );
};

/** 返回分页 BO/业务数据对象 */
export const ApiPaginatedResponseBO = <T extends Type<any>>(BO?: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponseBodyBO) },
          {
            properties: {
              data: {
                allOf: [
                  {
                    properties: {
                      page: { $ref: getSchemaPath(HttpResponsePageBO) },
                    },
                  },
                  {
                    properties: {
                      rows: {
                        type: 'array',
                        items: { $ref: getSchemaPath(BO) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};
