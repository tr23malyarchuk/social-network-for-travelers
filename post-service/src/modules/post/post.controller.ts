import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() createPostDto: PostDto) {
        return this.postService.create(createPostDto);
    }

    @Get()
    async showPosts() {
        return this.postService.showPosts();
    }

    @Get(':id/comments')
    async showCommentsByPostId(@Param('id') id: number) {
        return this.postService.showCommentsByPostId(id);
    }

    @Get(':id/likes')
    async showLikesForPost(@Param('id') id: number) {
        return this.postService.showLikesForPost(id);
    }
}
