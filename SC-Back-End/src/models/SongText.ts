import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { ISong, ISongText, IText } from '../../../SC-Common/DBModels';

@Table
export class SongText extends Model<SongText> implements ISongText {
    
    @PrimaryKey
    @Column
    id!: number

    @Column
    song_id!: number;
    
    @Column
    path!: string;

    @Column
    tags!: string;
    
    song?: ISong | undefined;
    
    text_id!: number;
    
    text?: IText | undefined;
}