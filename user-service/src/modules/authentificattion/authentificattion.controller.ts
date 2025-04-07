import { Controller, Logger, Put, Patch, Get, Post, UsePipes, Body, ValidationPipe, Param, Delete } from '@nestjs/common';
import { AuthentificattionService } from './authentificattion.service';
import { MessagePattern } from '@nestjs/microservices';
import { patterns } from '../patterns';
import { link } from 'fs';
import { Tokens, TokenPayload } from './dto/token.dto';


@Controller('authentificattion')
export class AuthentificattionController {
  private readonly  logger = new Logger(AuthentificattionController.name)
  constructor(private readonly authentificattionService: AuthentificattionService) {}

// @MessagePattern(patterns.AUTH.TOKENS)
@Post('token/generate')
 async generateTokens(@Body() dto) : Promise<Tokens>
 {
  this.logger.log('Generating tokens');
  return this.authentificattionService.generateTokens(dto);
 } 

 //@MessagePattern(patterns.AUTH.VERIFY)
 @Post('token/verify')
 async verifyToken(@Body('refreshToken') refreshToken: string) : Promise<TokenPayload>
 {
  this.logger.log('Verifying token');
  return this.authentificattionService.verifyRefreshToken(refreshToken);
}


//@MessagePattern(patterns.AUTH.REFRESH)

@Post('token/refresh')
 async refreshTokens(@Body('refreshToken') refreshToken: string) : Promise<Tokens>
 {
  this.logger.log('Refreshing tokens');
  return this.authentificattionService.refreshTokens(refreshToken);
 } 
}
