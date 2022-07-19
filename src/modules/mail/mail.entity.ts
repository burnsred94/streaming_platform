import { Column, DataType, Default, Model, Table } from "sequelize-typescript";


@Table
export class Mail extends Model<Mail> implements MailInterface {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true
    })
    userId: number

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    isActivate: boolean

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    urlActivate: string
}