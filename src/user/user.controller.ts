import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common'
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/createUser.dto';
import { updateUser } from './dto/uptadeUser.dto';
import { UserEntity } from './user.entity';
import {v4 as uuid} from 'uuid'
import { ListUserDTO } from './dto/listUser.dto';

@Controller("/users")
export class UserController {
    constructor(
        private userRepository: UserRepository
    ){}

    @Post()
    async postUser(@Body() dice: createUserDTO) {
        const userEntity = new UserEntity();
        userEntity.email = dice.email
        userEntity.name = dice.name
        userEntity.password = dice.password
        userEntity.id = uuid();

        this.userRepository.salve(userEntity);
        return { message: "Usuário criado!", dice }
    }

    @Get()
    async getUsers(){
        const listOfUsers = await this.userRepository.listUsers()
        const listOfUsersFiltrated = listOfUsers.map( user => new ListUserDTO(
            user.id,
            user.name
        ));
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
