import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';
import { AESModeType, AESPadType, EncodeType } from '@/common';

@Injectable()
export class CryptoProvider {

  /** 对字符串进行 md5 转换 */
  public md5(str: string): string {
    if (!str) return '';
    return CryptoJS.MD5(str).toString();
  }

  /** 将数据按指定编码类型序列化为字符串 */
  public stringify(data: any, type: EncodeType = 'Base64'): string {
    if (!data || !type) return '';

    const entity = typeof (data) !== 'string' ? JSON.stringify(data) : data;
    return CryptoJS.enc[type].stringify(CryptoJS.enc.Utf8.parse(entity));
  }

  /** 将序列化的字符串按指定编码类型，解析为原有数据 */
  public parse(str: string, type: EncodeType = 'Base64'): string {
    if (!str || !type) return '';

    return CryptoJS.enc[type].parse(str).toString(CryptoJS.enc.Utf8);
  }

  /** 对数据进行 aes 加密 */
  public aesEncrypt(data: any, secret: string, ivLength = 16, modeType: AESModeType = 'CBC', padType: AESPadType = 'Pkcs7') {
    if (!data || !secret) return '';

    const entity = typeof (data) !== 'string' ? JSON.stringify(data) : data;

    const key = CryptoJS.enc.Utf8.parse(this.md5(secret));
    const iv = CryptoJS.enc.Utf8.parse(this.md5(secret).substr(0, ivLength));

    const srcs = CryptoJS.enc.Utf8.parse(entity);
    const options = { iv, mode: CryptoJS.mode[modeType], padding: CryptoJS.pad[padType] };
    const encrypted = CryptoJS.AES.encrypt(srcs, key, options);

    return encrypted.ciphertext.toString().toUpperCase();
  }

  /** 对序列化的字符串进行 aes 解密 */
  public aesDecrypt(str: string, secret: string, ivLength = 16, modeType: AESModeType = 'CBC', padType: AESPadType = 'Pkcs7') {
    if (!str || !secret) return '';

    const key = CryptoJS.enc.Utf8.parse(this.md5(secret));
    const iv = CryptoJS.enc.Utf8.parse(this.md5(secret).substr(0, ivLength));

    const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const options = { iv, mode: CryptoJS.mode[modeType], padding: CryptoJS.pad[padType] };
    const decrypt = CryptoJS.AES.decrypt(srcs, key, options);
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

    return decryptedStr.toString();
  }
}
