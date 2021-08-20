import { Stream, Duplex } from 'stream';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamProvider {

  /** stream 转 buffer */
  public async streamToBuffer(stream: Stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('error', reject);
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }

  /** buffer 转 stream */
  public async bufferToStream(buffer: Buffer): Promise<Stream> {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
