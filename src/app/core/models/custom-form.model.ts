import { IFormProperty } from "./form-property.model";

export interface ICustomForm {
    title: string
    subTitle: string
    next?: string
    properties: IFormProperty[]
}