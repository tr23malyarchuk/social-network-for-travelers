import { Controller, Get, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('users')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.gatewayService.getUserData(id);
  }
}
