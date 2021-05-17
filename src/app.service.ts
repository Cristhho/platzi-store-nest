import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks,
  ) {}

  getHello() {
    return {
      message: `Hello World! ${this.configService.apiKey}`,
      tasks: this.tasks.data,
    };
  }
}
