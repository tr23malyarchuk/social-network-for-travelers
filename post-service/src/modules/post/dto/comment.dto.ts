import { IsInt } from "class-validator"

export class commentDto{

    @IsInt()
    postId: number
    @IsInt()
    userId: number
    @IsInt()
    text: string
}