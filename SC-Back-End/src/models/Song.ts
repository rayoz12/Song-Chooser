import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { ISong } from '../../../SC_Common/DBModels';

@Table
export class Song extends Model<Song> implements ISong {

    @Column
    id!: number

    @Column
    song_name!: string;

    @Column
    path!: string;

    @Column
    tags!: string;
}