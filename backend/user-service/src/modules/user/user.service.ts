import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDto } from './dto/user.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { RoleCreateDto } from './dto/role.dto';
import {AuthentificattionService} from '../authentificattion/authentificattion.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService, private readonly authentificationService: AuthentificattionService){}
    async findAll() {
        return this.prisma.user.findMany()
    }
    async create(dto: UserCreateDto)
    {
        const user = await this.prisma.user.create({  data: dto,  })
        return this.authentificationService.generateTokens({memberId: String(user.id), roleId: String(user.roleId)})
    }

    async findUserById(userId: number)
    {
        return this.prisma.user.findUnique({
            where: {id: userId},
        })
    }

    async findUserByEmail(Email: string)
    {
        return this.prisma.user.findUnique({
            where: {email: Email},
        })
    }

    async deleteUser(userId: number)
    {
        return this.prisma.user.delete({
            where: {id: userId},
        })
    }

    async resetPassword(Email: string, newPassword: string)
    {
        //const hashedPassword = await bcrypt.hash(newPassword, 10);
        try{
            return await this.prisma.user.update({
                where: {email: Email},
                data: {password: newPassword},
            })
        }
        catch(error)
        {
            throw new RpcException('User not found');
        }
    }
    async updateUser(userId: number, newDto: UserCreateDto)
    {
        try{
            return await this.prisma.user.update({
                where: {id: userId},
                data: {...newDto},
            })
        }
        catch(error){
             throw new RpcException('User not found');
        }
    }

    async createRole(dto: RoleCreateDto)
    {
        return this.prisma.role.create({data: dto});
    }
    
    async login(loginDto: LoginDto)
    {
        const user = await this.prisma.user.findUnique({where: {email: loginDto.email}})
        if(!user)
        {
            return "Login or password is invalid";
        }
        if(user.password === loginDto.password)
        {
            return this.authentificationService.generateTokens({memberId: String(user.id), roleId: String(user.roleId)})
        }
        else
        {
            return "Login or password is invalid";
        }
    }
}
