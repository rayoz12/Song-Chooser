import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, NotNull, Unique, Sequelize } from 'sequelize-typescript';
import { IText, IParagraph } from '../../../SC-Common/DBModels';

@Table
export class Text extends Model<Text> implements IText {

    @PrimaryKey
    @NotNull
    @AutoIncrement
    @Unique
    @Column
    id!: number

    @Column
    title!: string;

    @Column
    subtitle!: string;

    @Column({
        type: Sequelize.STRING(5000),
        get: function () {
            return JSON.parse(this.getDataValue('paragraphs'));
        },
        set: function(value: IParagraph) {
            return this.setDataValue('paragraphs', JSON.stringify(value));
        }
    })
    paragraphs!: IParagraph;
}

