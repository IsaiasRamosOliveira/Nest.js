import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator"
import { uniqueEmail } from "../validators/uniqueEmail.validador"

export class createUserDTO{

    @IsString()
    @IsNotEmpty({message: "O campo de name não pode estar vázio."})
    name: string
    
    @IsEmail(undefined, { message: "O e-mail informado é inválido."})
    @IsNotEmpty({ message: "O campo de e-mail não pode estar vázio." })
    @uniqueEmail({message: "Já existe uma usuáriocom este E-mail."})
    email: string

    @MinLength(6, {message: "A senha precisa ter pelo menos 6 caracteres."})
    @IsNotEmpty({ message: "O campo de senha não pode estar vázio." })
    password: string 
}