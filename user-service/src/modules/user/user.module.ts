import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import {AuthentificattionModule} from '../authentificattion/authentificattion.module'

@Module({
  imports: [AuthentificattionModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
