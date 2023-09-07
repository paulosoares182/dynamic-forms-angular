import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from 'src/app/core/enums/field-type.enum';
import { ICustomForm } from 'src/app/core/models/custom-form.model';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  form: FormGroup | null = null;

  get properties() {
    return this.form?.controls["properties"] as FormArray;
  }

  get types() {
    return this.enumToArray(FieldType)
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[a-z\-]$/)]],
      title: [null, [Validators.required]],
      subTitle: [null, [Validators.required]],
      next: [null, [Validators.pattern(/^[a-z\-]$/)]],
      properties: this.formBuilder.array([])
    });
  }

  enumToArray(enumme: any) {
    return Object.keys(enumme)
      .filter(value => !isNaN(Number(value)))
      .map(key => {
        return { text: enumme[key], value: key }
      });
  }

  addProperty(): void {
    if (!this.form) return;

    const property = this.formBuilder.group({
      name: [null, Validators.required],
      display: [null, Validators.required],
      subText: [null, Validators.required],
      defaultValue: [null, Validators.required],
      fieldType: [1, Validators.required],
      pattern: [null],
      invalidMessage: [null, Validators.required],
      required: [true, Validators.required],
      items: this.formBuilder.array([])
    });

    this.properties.push(property);
  }

  deleteProperty(index: number): void {
    this.properties.removeAt(index);
  }

  addPropertyItem(property: any): void {
    if (!this.form) return;

    const item = this.formBuilder.group({
      display: [null, Validators.required],
      value: [null, Validators.required],
    });

    (property.controls["items"] as FormArray).push(item);
  }

  deleteItem(property: any, index: number): void {
    (property.controls["items"] as FormArray).removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form?.value as ICustomForm)
  }
}