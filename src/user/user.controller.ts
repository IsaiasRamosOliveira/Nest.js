import { Body, Controller, Get, Post, Param } from '@nestjs/common'
import UserRepository from 'src/user/user.repository'

@Controller("/users")
export class UserController {

    @Post()
    async postUser(@Body() dice) {
        UserRepository.salve(dice);
        return { message: "Usuário criado!", dice }
    }

    @Get()
    async getUsers(){
        return UserRepository.dices;
    }

    @Get()
    async getUser(@Param() id){
        return `${id}`
    }


}
