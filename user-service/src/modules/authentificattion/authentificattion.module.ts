import { Module } from '@nestjs/common';
import { AuthentificattionService } from './authentificattion.service';
import { AuthentificattionController } from './authentificattion.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),       // або конфіг, якщо є
    ConfigModule,                 // <-- ось це додай
  ],
  controllers: [AuthentificattionController],
  providers: [AuthentificattionService, JwtService],
  exports: [AuthentificattionService],
})
export class AuthentificattionModule {}
