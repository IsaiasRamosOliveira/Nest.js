import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions} from 'class-validator'
import { UserRepository } from '../user.repository'
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(
        private userRepository: UserRepository
    ) { }
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userRepository.listUserPerEmail(value)
        return !user;
    };
}

export const uniqueEmail = (options: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: options,
            constraints: [],
            validator: UniqueEmailValidator
        });
    }
}
