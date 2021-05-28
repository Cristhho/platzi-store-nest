import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
