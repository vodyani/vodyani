import { HttpException } from '@nestjs/common';

/**
 * Bind the exception catch decorator for the function to be executed
 */
export const Catcher = (message: string, code: number) => {
  return (target: any, methodName: string, desc: PropertyDescriptor) => {
    const method = target[methodName];

    desc.value = async function(...args: any[]) {
      try {
        method.bind(this);
        const result = await method(...args);
        return result;
      } catch (error) {
        throw new HttpException(message, code);
      }
    };
  };
};
