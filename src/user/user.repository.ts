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
    async update(id: string, dice: Partial<UserEntity>){
        const possibleUser = this.dices.find(
            user => user.id === id
        )
        if(!possibleUser) throw new Error("Usuário não existe.");

        Object.entries(dice).forEach(([key, value]) => {
            if(key === 'id'){
                return;
            }
            possibleUser[key] = value
        })

        return possibleUser
    }
    async delete(id: string){
        const index = this.dices.findIndex(user => user.id === id);
        if (!index) throw new Error("Usuário não existe.");
        this.dices.splice(index, 1);
    }
}

