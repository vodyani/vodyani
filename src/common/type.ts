import { Request, Response } from 'express';

export type ENV = 'dev' | 'test' | 'pre' | 'prod';

export type REQ = Request;

export type RES = Response;

export type HashType = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';

export type EncodeType = 'Base64' | 'Latin1' | 'Hex' | 'Utf8' | 'Utf16' | 'Utf16LE';

export type AESModeType = 'CBC' | 'CFB' | 'CTR' | 'CTRGladman' | 'OFB' | 'ECB';

export type AESPadType = 'Pkcs7' | 'AnsiX923' | 'Iso10126' | 'Iso97971' | 'ZeroPadding' | 'NoPadding';
