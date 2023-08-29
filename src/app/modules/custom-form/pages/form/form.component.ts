import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldType } from 'src/app/core/enums/field-type.enum';
import { ICustomForm } from 'src/app/core/models/custom-form.model';
import { FormBase } from 'src/app/shared/common/form-base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends FormBase implements OnInit {
  constructor(formBuilder: FormBuilder) {
    let customForm: ICustomForm = {
      title: "1. Personal",
      subTitle: "Fill in your personal details.",
      properties: [
        {
          name: "id",
          display: "Id",
          defaultValue: "",
          fieldType: FieldType.TEXT,
          pattern: "^[0-9]+$",
          invalidMessage: "Invalid Id.",
          required: true
        },
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
          name: "age",
          display: "Age",
          defaultValue: "M",
          fieldType: FieldType.TEXT,
          pattern: "^[0-9]{2}$",
          invalidMessage: "Invalid Age.",
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

    let content = {
      id: "0001",
      fullName: "John Doe",
      age: "14"
    }

    super(formBuilder, customForm, content)
  }

  ngOnInit(): void {
    this.buildForm();
  }

  override onSubmit(): void {
    console.log(this.mapper())
    console.log(this.form)
    this.onSuccessfullySubmitted()
  }

  override onSuccessfullySubmitted(): void {
    if (this.hasNext()) {
      console.log(`Redirect to ${this.customForm.next}`)
    }
  }

  override onFailureSubmitted(): void {

  }
}
