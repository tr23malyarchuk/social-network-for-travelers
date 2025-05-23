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
  getPosts()
  {
    return this.postService.showPosts();
  }

  @Post(':postId/comments')
  @UseGuards(JwtAuthGuard)
  addNewComment(@Param('postId') postId: string, @Body() dto: commentDto)
  {
     return this.postService.addNewComment(Number(postId), dto);
  }

  @Get(":postId/comments")
  showAllComments(@Param('postId') postId: string)
  {
    return this.postService.showCommentsByPostId(Number(postId));
  }

  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  addNewLike(@Param('postId') postId: string, @Body() dto: likeDto)
  {
     return this.postService.addNewLike(Number(postId), dto);
  }

  @Get(':postId/likes')
  showLikeForPost(@Param('postId') postId: string)
  {
     return this.postService.showLikesForPost(Number(postId));
  }

}
