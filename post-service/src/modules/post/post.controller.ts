import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('add_new_post')
  async addNewPost(@Payload() postData: any) {
    return this.postService.addNewPost(postData);
  }

  @MessagePattern('get_all_posts')
  async getAllPosts() {
    return this.postService.showPosts();
  }

  @MessagePattern('add_new_comment')
  async addNewComment(@Payload() data: any) {
    return this.postService.addNewComment(data.postId, data.commentData);
  }

  @MessagePattern('add_new_like')
  async addNewLike(@Payload() data: any) {
    return this.postService.addNewLike(data.postId, data.likeData);
  }
}
