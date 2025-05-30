import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], 
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
