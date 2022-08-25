export enum HTTP_HEADER {
  /**
   * Used to locate problems during log queries, usually sent down by the gateway.
   */
  RID = 'x-request-id',
  /**
   * ClientAdapter-side `jwt` authentication credentials.
   */
  AUTH = 'Authorization',
  /**
   * Request platform
   */
  PLATFORM = 'x-request-platform',
  /**
   * The server-side api version, generally developed by the server.
   *
   * the client gets different interface content according to different versions.
   */
  API_VERSION = 'x-request-api-version',
  /**
   * Request content type.
   */
  CONTENT_TYPE = 'content-type',
}
