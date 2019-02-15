import { Sequelize } from 'sequelize-typescript';
// import { readdirSync } from "fs";
import { sep } from "path";

// console.log(__dirname + sep + ".." + sep + "models");

// console.log(readdirSync(__dirname + sep + ".." + sep + "models"));

export const sequelize = new Sequelize({
    database: "SongChooser",
    username: 'ryan',
    password: '',
    dialect: "sqlite",
    storage: "./SongChooser.db",
    modelPaths: [__dirname + sep + ".." + sep + "models"]
});