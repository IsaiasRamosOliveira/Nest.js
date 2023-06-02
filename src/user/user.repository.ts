import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository{
    public dices: UserEntity[] = [];
    
    async salve(dice: UserEntity){
        this.dices.push(dice);
    }
    async listUser(){
        return this.dices
    }
    async listUserPerEmail(email: string){
        const possibleUser = this.dices.find(dice => email == dice.email);
        return possibleUser !== undefined;
    }
}

