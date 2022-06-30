import { Column, DataType, Model, Table} from 'sequelize-typescript';
import { TokenInterface } from "./interfaces/token.interface";




@Table
export class Token extends Model<Token> implements TokenInterface{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true
    })
    userId: number

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    refreshToken: string

}




