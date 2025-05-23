import { StatementResultingChanges } from "node:sqlite"
import { IsInt, IsString } from "class-validator";


export class PostDto{

    @IsInt()
    userId: number

    @IsString()
    text: string

    @IsString()
    imageUrl: string

}