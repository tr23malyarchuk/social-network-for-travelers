import { Controller, Logger } from '@nestjs/common';
import { AuthentificattionService } from './authentificattion.service';
import { MessagePattern } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { link } from 'fs';
import { Tokens, TokenPayload } from './dto/token.dto';

@Controller('authentificattion')
export class AuthentificattionController {
  private readonly  logger = new Logger(AuthentificattionController.name)
  constructor(private readonly authentificattionService: AuthentificattionService) {}

 @MessagePattern(patterns.AUTH.TOKENS)
 async generateTokens(dto) : Promise<Tokens>
 {
  this.logger.log('Generating tokens');
  return this.authentificattionService.generateTokens(dto);
 } 

 @MessagePattern(patterns.AUTH.VERIFY)
 async verifyToken(dto) : Promise<TokenPayload>
 {
  this.logger.log('Verifying token');
  return this.authentificattionService.verifyRefreshToken(dto);
}

@MessagePattern(patterns.AUTH.REFRESH)
 async refreshTokens(dto) : Promise<Tokens>
 {
  this.logger.log('Refreshing tokens');
  return this.authentificattionService.refreshTokens(dto);
 } 
}
