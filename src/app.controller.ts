import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NextMoveDto } from './dto';

@Controller('/chess')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('start')
  getHello() {
    return this.appService.startGame();
  }

  @Post('next-move')
  getHey(@Body() data: NextMoveDto) {
    return this.appService.nextMove(data);
  }
}
