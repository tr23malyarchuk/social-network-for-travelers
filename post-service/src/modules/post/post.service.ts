import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostDto} from './dto/post.dto';
import { RpcException } from '@nestjs/microservices';
import { commentDto } from './dto/comment.dto';
import { likeDto } from './dto/like.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
    constructor(private readonly prisma:PrismaService, /*@Inject('IMAGE_PROCCESSING') private readonly client: ClientProxy,*/){}

    async addNewPost(dto: PostDto)
    {
        try{
            await this.prisma.user.findUnique({
                where: {id: dto.userId},
            })
        }
        catch(error){
            throw new RpcException('User not found');
        }
        // await this.client.emit('proccesImage', {imageUrl: dto.imageUrl});
        return this.prisma.post.create({data: dto});
    }
    
    async showPosts()
    {
        return this.prisma.post.findMany();
    }

    async addNewComment(postId: number, dto: commentDto)
    {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: dto.userId } })
            if (!user) {
                throw new RpcException("User not found")
            }
        }

        catch (error) {
            throw new RpcException("Unable to add new comment")
        }

        try {
            const post = await this.prisma.post.findUnique({ where: { id: postId } })
            if (!post) {
                throw new RpcException("Post not found")
            }
        }
        catch (error) {
            throw new RpcException("Unable to add new comment")
        }
        return this.prisma.comment.create({ data: dto });
    }

    async showCommentsByPostId(postId: number)
    {
        return this.prisma.comment.findMany({where: {postId: postId}})
    } 

    async addNewLike(postId: number, dto: likeDto)
    {
        try{
            const post = this.prisma.post.findUnique({where: {id: postId}})
            if(!post)
            {
                throw new RpcException("Post not found")
            }
        }
        catch(error){
            throw new RpcException("Unable to like")
        }
        return this.prisma.like.create({data: dto});
    }

    async showLikesForPost(postID: number)
    {
        return this.prisma.like.findMany({where: {postId: postID}})
    }

}
