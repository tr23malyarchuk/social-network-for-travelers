import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { commentDto } from './dto/comment.dto';
import { likeDto } from './dto/like.dto';
import {JwtAuthGuard} from '../../guards/jwt/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @Post()
  @UsePipes(new ValidationPipe)
  @UseGuards(JwtAuthGuard)
  AddNewPost(@Body() dto: PostDto)
  {
     return this.postService.addNewPost(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getPosts()
  {
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
