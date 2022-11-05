import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly _appService: AppService;

  constructor(appService: AppService) {
    this._appService = appService;
  }

  @Get()
  getHello(): string {
    return this._appService.getHello();
  }
}
