import { IUser } from "./../../../SC_Common/DBModels";
import { Table, Model, Column } from "sequelize-typescript";

@Table
export class User extends Model<User> implements IUser {
    @Column
    username: string;
    @Column
    password: string;
    @Column
    activated: boolean;

    constructor(username: string, password: string, activated: boolean) {
        super();

        this.username = username;
        this.password = password;
        this.activated = activated;
    }
}