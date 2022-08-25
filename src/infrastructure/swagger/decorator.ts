import { Class } from '@vodyani/core';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

import { ResponseBodyVo, PageVo } from '@/core/vo';

export function SwaggerEntity(target: any) {
  ExtraModelStore.set(target?.name, target);
}

export function ApiResponseVo(Vo?: Class) {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseBodyVo) },
          {
            properties: {
              data: Vo
                ? { $ref: getSchemaPath(Vo) }
                : { type: 'object' },
            },
          },
        ],
      },
    }),
  );
}

export function ApiArrayResponseVo(Vo?: Class) {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseBodyVo) },
          {
            properties: {
              data: Vo
                ? { type: 'array', $ref: getSchemaPath(Vo) }
                : { type: 'object' },
            },
          },
        ],
      },
    }),
  );
}

export function ApiPaginationResponseVo(Vo?: Class) {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseBodyVo) },
          {
            properties: {
              data: {
                allOf: [
                  {
                    properties: {
                      page: { $ref: getSchemaPath(PageVo) },
                    },
                  },
                  {
                    properties: {
                      rows: {
                        type: 'array',
                        items: { $ref: getSchemaPath(Vo) },
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
}
