// src/modules/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PostDto } from './dto/post.dto'; 
import { RpcException } from '@nestjs/microservices';
import { commentDto } from './dto/comment.dto';
import { likeDto } from './dto/like.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    // Метод для создания нового поста
    async create(createPostDto: PostDto) {
        try {
          const user = await this.prisma.user.findUnique({
            where: { id: createPostDto.userId },
          });
          if (!user) {
            throw new RpcException('User not found');
          }
        } catch (error) {
          throw new RpcException('User not found');
        }
      
        // Использование правильных полей из DTO
        return this.prisma.post.create({
          data: {
            title: createPostDto.title,    // Использование корректного названия поля из DTO
            content: createPostDto.content,
            userId: createPostDto.userId,
            text: createPostDto.text,
            imageUrl: createPostDto.imageUrl || '', // Пустая строка, если imageUrl не передан
          },
        });
      }

    // Метод для получения всех постов
    async showPosts() {
        return this.prisma.post.findMany();
    }

    // Метод для добавления комментария к посту
    async addNewComment(postId: number, dto: commentDto) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
            if (!user) {
                throw new RpcException('User not found');
            }
        } catch (error) {
            throw new RpcException('Unable to add new comment');
        }

        try {
            const post = await this.prisma.post.findUnique({ where: { id: postId } });
            if (!post) {
                throw new RpcException('Post not found');
            }
        } catch (error) {
            throw new RpcException('Unable to add new comment');
        }

        // Создание нового комментария
        return this.prisma.comment.create({
            data: {
                text: dto.text, // Добавление текста комментария
                userId: dto.userId,
                postId: postId,
            },
        });
    }

    // Метод для получения всех комментариев по ID поста
    async showCommentsByPostId(postId: number) {
        return this.prisma.comment.findMany({ where: { postId: postId } });
    }

    // Метод для добавления лайка
    async addNewLike(postId: number, dto: likeDto) {
        try {
            const post = await this.prisma.post.findUnique({ where: { id: postId } });
            if (!post) {
                throw new RpcException('Post not found');
            }
        } catch (error) {
            throw new RpcException('Unable to like');
        }

        // Создание нового лайка
        return this.prisma.like.create({ data: dto });
    }

    // Метод для получения всех лайков для поста
    async showLikesForPost(postId: number) {
        return this.prisma.like.findMany({ where: { postId: postId } });
    }

    async addNewPost(createPostDto: PostDto) {
        // Проверка на существование пользователя
        const user = await this.prisma.user.findUnique({
          where: { id: createPostDto.userId },
        });
        if (!user) {
          throw new RpcException('User not found');
        }
      
        // Создание нового поста
        return this.prisma.post.create({
          data: {
            title: createPostDto.title,
            content: createPostDto.content,
            text: createPostDto.text,
            imageUrl: createPostDto.imageUrl ?? '', // Используем пустую строку, если imageUrl не передан
            userId: createPostDto.userId,
          },
        });
      }
}
