import { IFormProperty } from "./form-property.model";

export interface ICustomForm {
    id?: number
    name?: string
    title: string
    subTitle: string
    next?: string
    properties: IFormProperty[]
}