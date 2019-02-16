import { IUser } from "./../../../SC-Common/DBModels";
import { Table, Model, Column, PrimaryKey } from "sequelize-typescript";

@Table
export class User extends Model<User> implements IUser {

    @PrimaryKey
    @Column
    id!: number

    @Column
    username!: string;

    @Column
    password!: string;
    
    @Column
    activated!: boolean;
}