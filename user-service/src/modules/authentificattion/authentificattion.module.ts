import { Module } from '@nestjs/common';
import { AuthentificattionService } from './authentificattion.service';
import { AuthentificattionController } from './authentificattion.controller';

@Module({
  controllers: [AuthentificattionController],
  providers: [AuthentificattionService],
})
export class AuthentificattionModule {}
