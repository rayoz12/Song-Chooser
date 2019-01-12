import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export class Song extends Model<Song> {

    @Column
    song_name!: string;

    @Column
    path!: string;

    @Column
    tags!: string;
}