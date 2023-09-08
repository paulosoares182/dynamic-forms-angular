import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldType } from 'src/app/core/enums/field-type.enum';
import { ICustomForm } from 'src/app/core/models/custom-form.model';
import { IFieldItem } from 'src/app/core/models/field-item.model';
import { IFormProperty } from 'src/app/core/models/form-property.model';
import { RecordService } from 'src/app/core/services/record.service';
import { FormBase } from 'src/app/shared/common/form-base';

type Dropdown = {
  text: string
  value: any
}
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent extends FormBase implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  service = inject(RecordService);

  fieldTypes!: Dropdown[];
  id?: number;

  get properties() {
    return this.form?.controls["properties"] as FormArray;
  }

  ngOnInit(): void {
    this.fieldTypes = this.enumToArray(FieldType);

    this.buildForm();

    this.route.params.subscribe(params => {
      const id = Number(params["id"]);

      if(id) {
        this.load(id);
        return;
      }

      this.router.navigate(["designer/new"]);
    })
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.pattern(/^([a-z\-]+)$/)]],
      title: [null, [Validators.required]],
      subTitle: [null, [Validators.required]],
      next: [null, [Validators.pattern(/^([a-z\-]+)$/)]],
      properties: this.formBuilder.array([])
    });
  }

  buildProperty(property?: IFormProperty): FormGroup {
    return this.formBuilder.group({
      name: [property?.name ?? null, Validators.required],
      display: [property?.display ?? null, Validators.required],
      subText: [property?.subText ?? null, Validators.required],
      defaultValue: [property?.defaultValue ?? null, Validators.required],
      fieldType: [property?.fieldType ?? null, Validators.required],
      pattern: [property?.pattern],
      invalidMessage: [property?.invalidMessage ?? null, Validators.required],
      required: [property?.required ?? null, Validators.required],
      items: this.formBuilder.array([])
    });
  }

  buildPropertyItem(item?: IFieldItem): FormGroup {
    return this.formBuilder.group({
      display: [item?.display ?? null, Validators.required],
      value: [item?.value ?? null, Validators.required],
    });
  }

  load(id: number): void {
    this.service.getCustomFormById(id).subscribe(payload => {
      this.form?.patchValue({
        id: id,
        name: payload?.name,
        title: payload?.title,
        subTitle: payload?.subTitle,
        next: payload?.next,
      });

      for (let property of payload?.properties ?? []) {
        const propertyForm = this.buildProperty(property);

        for (let item of property.items ?? []) {
          const itemForm = this.buildPropertyItem(item);

          (propertyForm.controls["items"] as FormArray).push(itemForm);
        }

        this.properties.push(propertyForm);
      }
    });
  }

  addProperty(): void {
    if (!this.form) return;

    const property = this.buildProperty();

    this.properties.push(property);
  }

  deleteProperty(index: number): void {
    this.properties.removeAt(index);
  }

  addPropertyItem(property: any): void {
    if (!this.form) return;

    const item = this.buildPropertyItem();

    (property.controls["items"] as FormArray).push(item);
  }

  deleteItem(property: any, index: number): void {
    (property.controls["items"] as FormArray).removeAt(index);
  }

  onSubmit(): void {
    if (!this.form?.valid) return;

    const payload = this.form?.value as ICustomForm;

    const response = (payload: ICustomForm) => {
      if (!payload.id) {
        this.onFailureSubmitted();
        return;
      }

      this.id = payload.id;
      this.onSuccessfullySubmitted();
    }

    if(payload.id) {
      this.service.updateCustomForm(payload).subscribe(response);
    } else {
      this.service.createCustomForm(payload).subscribe(response);
    }
  }

  override onSuccessfullySubmitted(): void {
    const isNew = !this.form?.get("id")?.value;

    if (isNew) {
      this.router.navigate([`designer/edit/${this.id}`]);
      return;
    }

    alert("Success");
  }

  override onFailureSubmitted(): void {
    alert("Fail!");
  }

  private enumToArray(enumme: any): Dropdown[] {
    return Object.keys(enumme)
      .filter(value => !isNaN(Number(value)))
      .map(key => {
        return { text: enumme[key], value: key } as Dropdown
      });
  }
}