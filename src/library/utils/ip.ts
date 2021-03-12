import { REQ } from '@common/type';

export class IPUtil {
  /**
   * Get the IP information of the current client
   */
  static getIp = (request: REQ): string =>
    request.headers['x-forwarded-for'] as string ||
    request.socket.remoteAddress as string ||
    request.headers['x-real-ip'] as string ||
    request.ip;
}
