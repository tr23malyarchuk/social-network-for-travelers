import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayService {
  private userServiceClient: ClientProxy;

  constructor(private configService: ConfigService) {
    this.userServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get('userService.host'),
        port: this.configService.get('userService.port'),
      },
    });
  }

  getUserData(userId: string) {
    return this.userServiceClient.send('get_user', userId);
  }
}
