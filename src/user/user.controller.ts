import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { NestResponseBuilder } from '../core/http/NestResponseBuilder';
import { NestResponse } from '../core/http/nestResponse';
import { createUserDTO } from './dtos/createUser.dto';
import { updateUser } from './dtos/uptadeUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';


@ApiTags("users")
@Controller("/users")
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async postUser(@Body() dice: createUserDTO): Promise<NestResponse> {
        const userEntity = new UserEntity();
        userEntity.id = uuid();
        userEntity.name = dice.name;
        userEntity.email = dice.email;
        userEntity.password = dice.password;
        this.userService.save(userEntity);

        return new NestResponseBuilder()
            .status(HttpStatus.CREATED)
            .headers({
                'Location': `/users/${userEntity.name}`
            })
            .body(userEntity)
            .build();
    }

    @Get()
    async getUsers() {
        const listOfUsers = await this.userService.listUsers();
        return listOfUsers;
    }

    @Get("/:id")
    async getUser(@Param("id") id: string) {
        const response = await this.userService.listUser(id);
        return response;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() data: updateUser) {
        await this.userService.update(id, data);
        return {
            message: "Usuário atualizado.",
            data
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.delete(id);
        return {
            message: "usuário removido com sucesso."
        }
    }

}
