import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Template } from './Template';
import { Song } from './Song';

@Table
export class TemplateDetail extends Model<TemplateDetail> {
    
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