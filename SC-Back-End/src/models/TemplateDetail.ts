import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, HasOne, PrimaryKey } from 'sequelize-typescript';
import { Template } from './Template';
import { Song } from './Song';
import { ITemplateDetail } from '../../../SC_Common/DBModels';

@Table
export class TemplateDetail extends Model<TemplateDetail> implements ITemplateDetail {

    @PrimaryKey
    @Column
    id!: number

    @ForeignKey(() => Template)
    @Column
    template_id!: number
    
    @BelongsTo(() => Template)
    template!: Template;
    
    @ForeignKey(() => Song)
    @Column
    song_id!: number
    
    @BelongsTo(() => Song)
    song!: Song
    
    @Column
    order_index!: number

    @Column
    template_song_name!: string
}