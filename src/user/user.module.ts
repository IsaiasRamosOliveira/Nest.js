import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UniqueEmailValidator } from "./validators/uniqueEmail.validador";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UniqueEmailValidator, UserService],
})

export class UserModule { }