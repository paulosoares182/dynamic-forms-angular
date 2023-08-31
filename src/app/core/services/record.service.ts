import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICustomForm } from '../models/custom-form.model';
import { FieldType } from '../enums/field-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  getCustomForm(record: string): Observable<ICustomForm | null> {
    switch(record) {
      case "personal": return of(this.getPersonal());
      case "foobar": return of(this.getFooBar());
    }

    return of(null);
  }

  private getPersonal(): ICustomForm {
    return {
      title: "1st Step",
      subTitle: "Personal Details",
      next: "foobar",
      properties: [
        // {
        //   name: "id",
        //   display: "Id",
        //   defaultValue: "",
        //   fieldType: FieldType.TEXT,
        //   pattern: "^[0-9]+$",
        //   invalidMessage: "Invalid Id.",
        //   required: true
        // },
        {
          name: "fullName",
          display: "Full Name",
          defaultValue: "",
          fieldType: FieldType.TEXT,
          pattern: "[^\n]{3,}",
          invalidMessage: "Invalid Name.",
          required: true
        },
        {
          name: "document",
          display: "Document Number",
          defaultValue: "",
          fieldType: FieldType.TEXT,
          pattern: "^[0-9]{9,11}$",
          invalidMessage: "Invalid Document.",
          required: true
        },
        {
          name: "birthDate",
          display: "Birth Date",
          defaultValue: "",
          fieldType: FieldType.DATEONLY,
          pattern: "^(19[4-9]{1}[0-9]{1}|200[0-6]{1})-(0[0-9]{1}|1[0-2]{1})-([0-2]{1}[0-9]{1}|[3[0-1]{1})$",
          invalidMessage: "Invalid Birth Date.",
          required: true
        },
        {
          name: "gender",
          display: "Gender",
          defaultValue: "",
          fieldType: FieldType.DROPDOWN,
          pattern: "^(M|F|O|N)$",
          invalidMessage: "Invalid Gender.",
          required: false,
          items: [
            { value: "M", display: "Male" },
            { value: "F", display: "Female" },
            { value: "O", display: "Other" },
            { value: "N", display: "None" }
          ]
        },
        {
          name: "observation",
          display: "Observation",
          defaultValue: "",
          fieldType: FieldType.TEXTAREA,
          pattern: "",
          invalidMessage: "Invalid Observation.",
          required: false
        },
        {
          name: "notify",
          display: "Notify?",
          defaultValue: "",
          fieldType: FieldType.RADIOBUTTON,
          invalidMessage: "Invalid Notify.",
          required: true,
          items: [
            { value: "true", display: "Yes, I want to be notified by email." },
            { value: "false", display: "I do not wish to receive notifications." }
          ]
        },
        {
          name: "acceptTerms",
          display: "Accept Terms",
          subText: "I agree with the terms.",
          defaultValue: "",
          fieldType: FieldType.CHECKBOX,
          invalidMessage: "Invalid Accept Terms.",
          required: true
        }
      ]
    }
  }

  private getFooBar(): ICustomForm {
    return {
      title: "2st Step",
      subTitle: "Foo bar",
      properties: [
        {
          name: "foo",
          display: "Foo",
          defaultValue: "",
          fieldType: FieldType.TEXT,
          pattern: "[^\n]",
          invalidMessage: "Invalid Foo.",
          required: true
        },
        {
          name: "bar",
          display: "Bar",
          defaultValue: "",
          fieldType: FieldType.TEXT,
          pattern: "[^\n]",
          invalidMessage: "Invalid Bar.",
          required: true
        }
      ]
    }
  }
}