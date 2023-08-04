import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ListUserDTO } from "./dtos/listUser.dto";
import { updateUser } from "./dtos/uptadeUser.dto";
import { UserEntity } from "./user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async listUsers() {
        const res = await this.userRepository.find();
        const users = res.map((user) => new ListUserDTO(user.id, user.name))
        if (users.length === 0) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado.'
            })
        }
        return users
    }
    async listUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } })
        return user
    }
    async listUserPerEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user;
    }
    async save(data: UserEntity) {
        const user = await this.userRepository.save(data);
        return user;
    }
    async update(id: string, data: updateUser) {
        const user = await this.userRepository.update(id, data);
        return user;
    }
    async delete(id: string) {
        await this.userRepository.delete(id);
    }
}