import * as CryptoJS from 'crypto-js';
import { HashType, EncodeType, AESModeType, AESPadType } from '@common/type';

/**
 * @see: [cryptojs](https://cryptojs.gitbook.io/docs/)
*/
export class CryptoUtil {
  /**
   * hashing
   *
   * Hash encoding algorithms
   */
  static hashing(str: string, type: HashType = 'MD5'): string {
    if (!str || !type) return '';

    return CryptoJS[type](str).toString();
  }

  /**
   * encodeStringify
   *
   * convert from encoding formats such as Base64, Latin1 or Hex to WordArray objects and vice-versa.
   */
  static encodeStringify(data: any, type: EncodeType = 'Base64'): string {
    if (!data || !type) return '';

    const entity = typeof (data) !== 'string' ? JSON.stringify(data) : data;
    return CryptoJS.enc[type].stringify(CryptoJS.enc.Utf8.parse(entity));
  }

  /**
   * encodeParse
   *
   * convert from encoding formats such as Base64, Latin1 or Hex to WordArray objects and vice-versa.
   */
  static encodeParse(str: string, type: EncodeType = 'Base64'): string {
    if (!str || !type) return '';

    return CryptoJS.enc[type].parse(str).toString(CryptoJS.enc.Utf8);
  }

  /**
   * aesSimpleEncrypt
   *
   * AES-256 (the default)
   *
   * supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in. If you use a passphrase, then it will generate a 256-bit key.
   */
  static aesSimpleEncrypt(data: any, secret: string): string {
    if (!data || !secret) return '';

    const entity = typeof (data) !== 'string' ? JSON.stringify(data) : data;
    return CryptoJS.AES.encrypt(entity, secret).toString();
  }

  /**
   * aesSimpleDecrypt
   *
   * AES-256 (the default)
   *
   * supports AES-128, AES-192, and AES-256. It will pick the variant by the size of the key you pass in. If you use a passphrase, then it will generate a 256-bit key.
   */
  static aesSimpleDecrypt(str: string, secret: string): string {
    if (!str || !secret) return '';

    return CryptoJS.AES.decrypt(str, secret).toString(CryptoJS.enc.Utf8);
  }

  /**
   * aesEncrypt
   *
   * `modeType` supports the following modes:
   * * CBC (the default)
   * * CFB
   * * CTR
   * * OFB
   * * ECB
   *
   * `padType` supports the following padding schemes:
   * * Pkcs7 (the default)
   * * Iso97971
   * * AnsiX923
   * * Iso10126
   * * ZeroPadding
   * * NoPadding
   */
  static aesEncrypt(data: any, secret: string, ivLength = 16, modeType: AESModeType = 'CBC', padType: AESPadType = 'Pkcs7') {
    if (!data || !secret) return '';

    const entity = typeof (data) !== 'string' ? JSON.stringify(data) : data;

    const key = CryptoJS.enc.Utf8.parse(this.hashing(secret));
    const iv = CryptoJS.enc.Utf8.parse(this.hashing(secret).substr(0, ivLength));

    const srcs = CryptoJS.enc.Utf8.parse(entity);
    const options = { iv, mode: CryptoJS.mode[modeType], padding: CryptoJS.pad[padType] };
    const encrypted = CryptoJS.AES.encrypt(srcs, key, options);

    return encrypted.ciphertext.toString().toUpperCase();
  }

  /**
   * aesDecrypt
   *
   * `modeType` supports the following modes:
   * * CBC (the default)
   * * CFB
   * * CTR
   * * OFB
   * * ECB
   *
   * `padType` supports the following padding schemes:
   * * Pkcs7 (the default)
   * * Iso97971
   * * AnsiX923
   * * Iso10126
   * * ZeroPadding
   * * NoPadding
   */
  static aesDecrypt(str: string, secret: string, ivLength = 16, modeType: AESModeType = 'CBC', padType: AESPadType = 'Pkcs7') {
    if (!str || !secret) return '';

    const key = CryptoJS.enc.Utf8.parse(this.hashing(secret));
    const iv = CryptoJS.enc.Utf8.parse(this.hashing(secret).substr(0, ivLength));

    const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const options = { iv, mode: CryptoJS.mode[modeType], padding: CryptoJS.pad[padType] };
    const decrypt = CryptoJS.AES.decrypt(srcs, key, options);
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

    return decryptedStr.toString();
  }
}
