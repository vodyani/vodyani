import { Module } from '@nestjs/common';

import { StreamProvider, CryptoProvider, UrlProvider } from './provider';

@Module({
  exports: [
    UrlProvider,
    StreamProvider,
    CryptoProvider,
  ],
  providers: [
    UrlProvider,
    StreamProvider,
    CryptoProvider,
  ],
})
export class UtilsModule {}
