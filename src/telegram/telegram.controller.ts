import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('test')
  testBot(){
    return {message:'El bot está funcionando de manera correcta'};
  }
}
