import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { TemplateDetail } from './TemplateDetail';
import { ITemplate } from '../../../SC_Common/DBModels';

@Table
export class Template extends Model<Template> implements ITemplate {

    @Column
    id!: number

    @Column
    name!: string

    @HasMany(() => TemplateDetail)
    templateDetails!: TemplateDetail[]
}