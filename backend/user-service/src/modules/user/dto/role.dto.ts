import { StatementResultingChanges } from "node:sqlite"
import { IsArray, IsString } from "class-validator";
import { UserCreateDto } from "./user.dto";

export class RoleCreateDto {
    @IsString()
    name: string

    @IsArray()
    @IsString({each: true})
    permissions: string[]

}
