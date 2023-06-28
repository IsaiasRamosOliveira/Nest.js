import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator"


export class updateUser {
    @IsString()
    @IsNotEmpty({message: "O campo de name não pode estar vázio."})
    @IsOptional()
    name: string
    
    @IsEmail(undefined, { message: "O e-mail informado é inválido."})
    @IsNotEmpty({ message: "O campo de e-mail não pode estar vázio." })
    @IsOptional()
    email: string

    @MinLength(6, {message: "A senha precisa ter pelo menos 6 caracteres."})
    @IsNotEmpty({ message: "O campo de senha não pode estar vázio." })
    @IsOptional()
    password: string 
}