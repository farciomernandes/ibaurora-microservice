import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  apiVersion(): { status: string; version: string } {
    return { status: 'success', version: '1.0.0' };
  }
}
