import {Table, Column, Model, DataType, HasOne, HasMany} from 'sequelize-typescript';
import { UserInterface } from "./interfaces/user.interface";
import { Token } from "../token/token.entity";
import { Mail } from "../mail/mail.entity";



@Table
export class User extends Model<User> implements UserInterface{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        values: ['male', 'female'],
        allowNull: false
    })
    gender: string;


    @HasOne(()=> Token, 'userId')
    tokens: Token[]

    @HasOne(()=> Mail, 'userId')
    activateAcc: Mail[]
}


