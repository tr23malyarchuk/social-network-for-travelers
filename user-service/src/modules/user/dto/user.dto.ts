import { StatementResultingChanges } from "node:sqlite"
import { IsInt, IsString } from "class-validator";
import { RoleCreateDto } from "./role.dto";

export class UserCreateDto {
    @IsString()
    nickname: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsInt()
    roleId: number

}

export type TUsersUpdateDto = Partial<UserCreateDto>