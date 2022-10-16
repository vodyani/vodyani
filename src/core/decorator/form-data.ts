import { applyDecorators, Post, Put, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

/**
 * Route handler (method) Decorator. Routes HTTP `POST` FormData requests to the specified path.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 *
 * @publicApi
 */
export function PostFormData(path: string | string[]) {
  return applyDecorators(
    Post(path),
    UseInterceptors(AnyFilesInterceptor({})),
  );
}

/**
 * Route handler (method) Decorator. Routes HTTP `PUT` FormData requests to the specified path.
 *
 * @see [Routing](https://docs.nestjs.com/controllers#routing)
 *
 * @publicApi
 */
export function PutFormData(path: string | string[]) {
  return applyDecorators(
    Put(path),
    UseInterceptors(AnyFilesInterceptor({})),
  );
}
