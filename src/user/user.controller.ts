import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUserDTO } from './dtos/createUser.dto';
import { updateUser } from './dtos/uptadeUser.dto';
import { UserService } from './user.service';
import { ListUserDTO } from './dtos/listUser.dto';


@ApiTags("users")
@Controller("/users")
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async postUser(@Body() data: createUserDTO) {
        const user = await this.userService.save(data)
        return {
            data: new ListUserDTO(user.id, user.name),
            message: "Usuário criado com sucesso."
        }
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
