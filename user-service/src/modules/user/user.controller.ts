// user.controller.ts (user-service)
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')  // Команда для создания пользователя
  async createUser(@Payload() userData: any) {
    return this.userService.create(userData);
  }

  @MessagePattern('get_user_by_id')  // Команда для получения пользователя по ID
  async getUserById(@Payload() data: any) {
    return this.userService.findUserById(data.userId);
  }

  @MessagePattern('update_user')  // Команда для обновления пользователя
  async updateUser(@Payload() data: any) {
    return this.userService.updateUser(data.userId, data.userData);
  }

  @MessagePattern('delete_user')  // Команда для удаления пользователя
  async deleteUser(@Payload() data: any) {
    return this.userService.deleteUser(data.userId);
  }
}
