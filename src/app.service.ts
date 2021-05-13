import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks,
  ) {}

  getHello() {
    return {
      message: `Hello World! ${this.apiKey}`,
      tasks: this.tasks.data,
    };
  }
}
