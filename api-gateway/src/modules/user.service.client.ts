import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserServiceClient {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROCKER_URI],
      queue: 'user_service_queue',
      queueOptions: { durable: false },
    },
  })
  private client: ClientProxy;

  createUser(userData: any): Observable<any> {
    return this.client.send('create_user', userData);
  }

  getUserById(userId: number): Observable<any> {
    return this.client.send('get_user_by_id', { userId });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.client.send('update_user', { userId, ...userData });
  }

  deleteUser(userId: number): Observable<any> {
    return this.client.send('delete_user', { userId });
  }
}
