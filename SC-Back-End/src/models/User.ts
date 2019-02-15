import { IUser } from "./../../../SC_Common/DBModels";
import { Table, Model, Column } from "sequelize-typescript";

@Table
export class User extends Model<User> implements IUser {

    @Column
    id!: number

    @Column
    username!: string;

    @Column
    password!: string;
    
    @Column
    activated!: boolean;
}