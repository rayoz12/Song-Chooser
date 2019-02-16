import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { TemplateDetail } from './TemplateDetail';
import { ITemplate } from '../../../SC-Common/DBModels';

@Table
export class Template extends Model<Template> implements ITemplate {

    @PrimaryKey
    @Column
    id!: number

    @Column
    name!: string

    @HasMany(() => TemplateDetail)
    templateDetails!: TemplateDetail[]
}