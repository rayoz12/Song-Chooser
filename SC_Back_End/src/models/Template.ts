import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { TemplateDetail } from './TemplateDetail';

@Table
export class Template extends Model<Template> {

    @Column
    name!: string

    @HasMany(() => TemplateDetail)
    templateDetails!: TemplateDetail[]
}