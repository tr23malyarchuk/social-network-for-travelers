import { IsInt } from "class-validator"

export class likeDto
{
    @IsInt()
    postId: number
    @IsInt()
    userId: number
}