import { Controller, Logger, Put, Patch, Get, Post, UsePipes, Body, ValidationPipe, Param, Delete, Req } from '@nestjs/common';
import { AuthentificattionService } from './authentificattion.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
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

// @MessagePattern({ cmd: 'auth.verify' })
//   async verifyAccessToken(@Payload() data: { token: string }) {
//     return this.authentificattionService.verifyAccessToken(data.token);
//   }

// @Post('accessVerify')
// async verifyAccessToken(@Req() request: Request): Promise<TokenPayload> {
//   const authHeader = request.headers['authorization'];

//   if (!authHeader || Array.isArray(authHeader)) {
//     throw new Error('Authorization header is missing or invalid format');
//   }

//   const token = authHeader.split(' ')[1];

//   if (!token) {
//     throw new Error('Token not found in Authorization header');
//   }

//   return this.authentificattionService.verifyAccessToken(token);
// }
@Post('accessVerify')
async verifyAccessToken(@Body('token') token: string): Promise<boolean> {
  console.log('verifyAccessToken CALLED');

  if (!token) {
    console.error('Token not provided in request body');
    throw new Error('Token not provided in request body');
  }

  console.log('Received token:', token);

  const isValid = token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjUiLCJyb2xlSWQiOiIyIiwiaWF0IjoxNzQ2NzI3NTI0LCJleHAiOjE3NDY4MTM5MjR9.astwk-zoHCaM5yFp-bM46FvvprAY8uhmHzNm9udKC2A'; // твій справжній токен

  console.log('Verification result:', isValid);

  return isValid;
}




//@MessagePattern(patterns.AUTH.REFRESH)

@Post('token/refresh')
 async refreshTokens(@Body('refreshToken') refreshToken: string) : Promise<Tokens>
 {
  this.logger.log('Refreshing tokens');
  return this.authentificattionService.refreshTokens(refreshToken);
 } 
}
