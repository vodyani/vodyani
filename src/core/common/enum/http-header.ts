export enum HTTP_HEADER {
  /**
   * Used to locate problems during log queries, usually sent down by the gateway.
   */
  RID = 'x-request-id',
  /**
   * ClientAdapter-side JWT authentication credentials
   */
  AUTH = 'Authorization',
  /**
   * Request Platform
   */
  PLATFORM = 'x-request-platform',
  /**
   * The server-side API version, generally developed by the server.
   * the client gets different interface content according to different versions
   */
  API_VERSION = 'x-request-api-version',
}
