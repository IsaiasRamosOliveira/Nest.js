class UserRepository{
    public dices = [];
    
    async salve(dice: object){
        this.dices.push(dice);
    }
}

export default new UserRepository;