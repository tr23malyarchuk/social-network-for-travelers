import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './modules/user/user.controller';
import { PostController } from '../../post-service/src/modules/post/post.controller';  // Додаємо для Post

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4001 },
      },
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4002 },  // Порт для пост-сервісу
      },
    ]),
  ],
  controllers: [UserController, PostController],
})
export class AppModule {}
