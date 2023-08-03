import { Body, Controller, Get, Post, Param, Put, Delete, HttpStatus, NotFoundException } from '@nestjs/common'
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/createUser.dto';
import { updateUser } from './dto/uptadeUser.dto';
import { UserEntity } from './user.entity';
import {v4 as uuid} from 'uuid'
import { ListUserDTO } from './dto/listUser.dto';
import { NestResponse } from '../core/http/nestResponse';
import { NestResponseBuilder } from '../core/http/NestResponseBuilder';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("users")
@Controller("/users")
export class UserController {
    constructor(
        private userRepository: UserRepository
    ){}

    @Post()
    async postUser(@Body() dice: createUserDTO): Promise<NestResponse> {
        const userEntity = new UserEntity();
        userEntity.id = uuid();
        userEntity.name = dice.name;
        userEntity.email = dice.email;
        userEntity.password = dice.password;
        this.userRepository.salve(userEntity);
        
        return new NestResponseBuilder()
            .status(HttpStatus.CREATED)
            .headers({
                'Location': `/users/${userEntity.name}`
            })
            .body(userEntity)
            .build();
    }

    @Get()
    async getUsers(){
        const listOfUsers = await this.userRepository.listUsers()
        const listOfUsersFiltrated = listOfUsers.map( user => new ListUserDTO(
            user.id,
            user.name
        ));
        if(listOfUsersFiltrated.length === 0){
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado.'
            })
        }
        return listOfUsersFiltrated;
    }

    @Get("/:id")
    async getUser(@Param("id") id: string) {
        const response = await this.userRepository.listUser(id);
        return response;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() dice: updateUser){
        await this.userRepository.update(id, dice);
        return {
            message: "Usuário atualizado.",
            dice
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:string){
        await this.userRepository.delete(id);
        return {
            message: "usuário removido com sucesso."
        }
    }

}
