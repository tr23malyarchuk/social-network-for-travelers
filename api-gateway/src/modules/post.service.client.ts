import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class PostServiceClient {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROCKER_URI],
      queue: 'post_service_queue',
      queueOptions: { durable: false },
    },
  })
  private client: ClientProxy;

  addNewPost(postData: any): Observable<any> {
    return this.client.send('add_new_post', postData);
  }

  getPosts(): Observable<any> {
    return this.client.send('get_all_posts', {});
  }

  addComment(postId: number, commentData: any): Observable<any> {
    return this.client.send('add_new_comment', { postId, ...commentData });
  }

  addLike(postId: number, likeData: any): Observable<any> {
    return this.client.send('add_new_like', { postId, ...likeData });
  }
}
