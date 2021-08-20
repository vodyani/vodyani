/**
 * @description: 公共枚举值
 * @type: common-enum
 */

/** 字符串布尔值 */
export enum STRBOOL {
  TRUE = 'true',
  FALSE = 'false',
}

/** 状态 */
export enum STATUS {
  /** 处理中 */
  PENDING = 'PENDING',
  /** 完成 */
  DONE = 'DONE',
  /** 失败 */
  FAIL = 'FAIL',
  /** 有效 */
  VALID = 'VALID',
  /** 无效 */
  INVALID = 'INVALID',
  /** 删除 */
  DELETE = 'DELETE',
}

/** 环境变量 */
export enum ENV {
  /** 默认 */
  DEFAULT = 'default',
  /** 开发 */
  DEV = 'dev',
  /** 测试 */
  TEST = 'test',
  /** 预发布 */
  PRE = 'pre',
  /** 正式环境 */
  PROD = 'prod',
}

/** node.js 外部输入的环境变量 */
export enum ENV_PARAM {
  /** 环境变量 */
  ENV = 'NODE_ENV',
  /** 端口 */
  PORT = 'NODE_PORT',
  /** 应用名 */
  NAME = 'NODE_APP_NAME',
  /** 是否启用 swagger，默认是 'true' */
  ENABLE_SWAGGER = 'NODE_ENABLE_SWAGGER',
  /** 是否启用 sequelize 实体同步，默认是 'false' */
  ENABLE_SEQUELIZE_SYNC = 'NODE_ENABLE_SEQUELIZE_SYNC',
}

/** http 服务常用请求头 */
export enum HTTP_HEADER {
  /** 客户端 ip */
  IP = 'x-request-ip',
  /**
   * 客户端 JWT 鉴权解析出内容中的 用户 ID
   * 网关鉴权后会新增 UID 到 request header 中（前提是 JWT 内容中有 uid）
   */
  UID = 'x-request-uid',
  /** 客户端 JWT 鉴权凭证 */
  AUTH = 'Authorization',
  /** 用于查询日志，由网关下发 */
  REQUEST_ID = 'x-request-id',
  /** 客户端版本 */
  VERSION = 'x-request-version',
  /** 客户端平台 */
  PLATFORM = 'x-request-platform',
  /** 客户端支持的语言 */
  LANGUAGE = 'x-request-accept-language',
  /** 服务端的 API 版本，一般由服务端制定，客户端根据不同版本获取不同的接口内容 */
  API_VERSION = 'x-request-api-version',
}

/** http 状态码映射 */
export enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 408,
  PARAM_UNPROCESSABLE = 422,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  UNAVAILABLE = 503,
  LOGIN_PARAM_UNPROCESSABLE = 42200001,
}
