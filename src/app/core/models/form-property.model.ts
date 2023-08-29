import { FieldType } from "../enums/field-type.enum"
import { IFieldItem } from "./field-item.model"

export interface IFormProperty {
    name: string
    display: string,
    subText?: string,
    defaultValue: any,
    fieldType: FieldType,
    pattern?: string,
    invalidMessage: string,
    required: boolean,
    items?: IFieldItem[]
}