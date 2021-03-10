import { Request } from 'express';

/**
 * Get the IP information of the current client
 */
export const getIp = (request: Request): string =>
  request.headers['x-forwarded-for'] as string ||
  request.socket.remoteAddress as string ||
  request.headers['x-real-ip'] as string ||
  request.ip;
