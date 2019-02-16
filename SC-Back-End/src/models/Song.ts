import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { ISong } from '../../../SC-Common/DBModels';

@Table
export class Song extends Model<Song> implements ISong {

    @PrimaryKey
    @Column
    id!: number

    @Column
    song_name!: string;

    @Column
    path!: string;

    @Column
    tags!: string;
}