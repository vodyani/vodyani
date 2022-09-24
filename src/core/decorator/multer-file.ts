import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Post } from '@vodyani/core';

/**
 * Route handler (method) Decorator. Routes HTTP POST FormData requests to the specified path.
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
