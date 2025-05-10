// user.controller.ts (user-service)
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
import {MessagePattern} from '@nestjs/microservices';
import { patterns } from '../patterns';
import { RoleCreateDto } from './dto/role.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
@Get()
findAll()
{
  return this.userService.findAll();
}

@Post('/register')
@UsePipes(new ValidationPipe)
createUser(@Body() dto: UserCreateDto)
{
  return this.userService.create(dto)
}

// @MessagePattern(patterns.USER.CREATE)
// async createUser(dto: UserCreateDto)
// {
//   console.log(dto);
//   this.logger.log('Creating user');
//   return this.userService.create(dto);
// }

// @MessagePattern(patterns.USER.FIND_ALL)
// async findAllUsers()
// {
//   return this.userService.findAll();
// }

//@MessagePattern(patterns.USER.FIND_BY_ID)
@Get('id/:id')
async findUserById(@Param('id') id: string)
{
  return this.userService.findUserById(Number(id));
}

//@MessagePattern(patterns.USER.FIND_BY_EMAIL)
@Get('email/:email')
async findUserByEmail(@Param('email') email: string)
{
  return this.userService.findUserByEmail(email);
}
//@MessagePattern(patterns.USER.UPDATE)
  @Put('id/:id/updateUser')
  async updateUser(@Param('id') id: string, @Body() dto: UserCreateDto) {
    return this.userService.updateUser(Number(id), dto)
  }


//@MessagePattern(patterns.USER.DELETE)
@Delete('delete/:id')
async deleteUser(@Param('id') id: string)
{
  return this.userService.deleteUser(Number(id));
}

//@MessagePattern(patterns.USER.RESET_PASSWORD)
@Patch('email/:email/resetPassword')
async resetPassword(@Param('email')  email: string,
@Body('newPassword') newPassword: string )
{
  return this.userService.resetPassword(email, newPassword);  
}

@Post('role')
@UsePipes(new ValidationPipe)
async createRole(@Body() dto: RoleCreateDto)
{
   return this.userService.createRole(dto);
}

@Post('login')
async login(@Body() loginDto: LoginDto){
  return this.userService.login(loginDto);
}

}
