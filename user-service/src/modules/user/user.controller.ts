import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')
  async createUser(@Payload() userData: any) {
    return this.userService.create(userData);
  }

  @MessagePattern('get_user_by_id')
  async getUserById(@Payload() data: any) {
    return this.userService.findUserById(data.userId);
  }

  @MessagePattern('update_user')
  async updateUser(@Payload() data: any) {
    return this.userService.updateUser(data.userId, data.userData);
  }

  @MessagePattern('delete_user')
  async deleteUser(@Payload() data: any) {
    return this.userService.deleteUser(data.userId);
  }
}
