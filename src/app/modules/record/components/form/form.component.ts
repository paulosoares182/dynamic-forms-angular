import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldType } from 'src/app/core/enums/field-type.enum';
import { ICustomForm } from 'src/app/core/models/custom-form.model';
import { IFormProperty } from 'src/app/core/models/form-property.model';
import { FormBase } from 'src/app/shared/common/form-base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends FormBase implements OnInit {
  @Input({ required: true }) customForm!: ICustomForm;
  @Input() record?: any;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  
  ngOnInit(): void {
    this.buildForm();
  }

  protected buildForm(): void {
    if (!this.customForm) return;

    const fields: any = {};

    for (let property of this.customForm.properties) {
      switch (property.fieldType) {
        case FieldType.RADIOBUTTON:
          const subGroup: any = {};

          subGroup[property.name] = new FormControl(this.getValue(property), this.getValidators(property));
          fields[property.name] = this.formBuilder.group(subGroup);
          break;
        default:
          fields[property.name] = new FormControl(this.getValue(property), this.getValidators(property));
          break;
      }
    }

    this.form = this.formBuilder.group(fields);
  }

  private getValidators(property: IFormProperty): ValidatorFn[] {
    let validators: ValidatorFn[] = [];

    if (property.required) {
      validators.push(Validators.required);
    }

    if (property.pattern) {
      validators.push(Validators.pattern(new RegExp(property.pattern, 'm')));
    }

    return validators;
  }

  private getValue(property: IFormProperty): any {
    let value = this.record ? this.record[property.name] : null;

    if (!value && property.required) {
      value = property.defaultValue;
    }

    return value;
  }

  protected hasNext(): boolean {
    return !!this.customForm.next
  }

  protected mapper(): any {
    if (!this.form?.controls) {
      return null;
    }

    this.record ??= {};

    Object.keys(this.form.controls).forEach(key => {
      const group = this.getGroup(key);
      const value = group ? group.controls[key].value : this.form!.controls[key].value;
      this.record[key] = value;
    });

    return this.record;
  }

  override onSubmit(): void {
    console.log(this.mapper())
    this.onSuccessfullySubmitted()
  }

  override onSuccessfullySubmitted(): void {
    if (this.hasNext()) {
      this.router.navigate([`../${this.customForm.next}`], { relativeTo: this.activatedRoute })
    }
  }

  override onFailureSubmitted(): void {

  }
}
