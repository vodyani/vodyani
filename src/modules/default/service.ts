import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultService {
  public async index() {
    return {};
  }
}
