import {MinLength, IsEnum, IsNotEmpty, IsEmail } from 'class-validator';

enum Gender {
    MALE = 'male',
    FEMALE = 'FEMALE'
}

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;
}