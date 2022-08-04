import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  apiVersion(): { status: string; version: string } {
    return { status: 'success', version: '1.0.0' };
  }
}
