import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions} from 'class-validator'
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(
        private userService: UserService
    ) { }
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.listUserPerEmail(value)
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
