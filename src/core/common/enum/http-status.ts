export enum HTTP_STATUS {
  /**
   * In the following location, declare the base status code.
   */
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  UNPROCURABLE = 422,
  BAD_SERVER = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  UNAVAILABLE = 503,
  /**
   * Here you can define a custom status code using the rule: `{statusCode}0000{self-incrementing}`
   *
   * @usageNotes {HTTP_STATUS.UNPROCURABLE}0000{1} -> 42200001
   */
  LOGIN_UNPROCURABLE = 42200001,
}
