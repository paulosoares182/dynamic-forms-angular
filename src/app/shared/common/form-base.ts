import { Component, Input } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FieldType } from "src/app/core/enums/field-type.enum";
import { ICustomForm } from "src/app/core/models/custom-form.model";
import { IFormProperty } from "src/app/core/models/form-property.model";

@Component({
    template: ''
})
export abstract class FormBase {
    @Input({ required: true }) customForm!: ICustomForm;
    @Input() record?: any;

    public form?: FormGroup;
    public title?: string;
    public subTitle?: string;

    constructor(private formBuilder: FormBuilder) { }
    
    abstract onSubmit(): void;
    abstract onSuccessfullySubmitted(): void;
    abstract onFailureSubmitted(): void;

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

    protected getGroup(controlName: string): FormGroup | null {
        const control = this.form?.get(controlName);

        if (!(control instanceof FormGroup)) {
            return null;
        }

        return control as FormGroup;
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

    protected reset(): void {
        this.form?.reset();
    }

    protected hasNext(): boolean {
        if (this.customForm.next) {
            return true;
        }

        return false;
    }

    protected hasRequiredError(controlName: string): boolean {
        return this.hasError(controlName, "required");
    }

    protected hasPatternError(controlName: any): boolean {
        return this.hasError(controlName, "pattern");
    }

    protected getCssValidation(controlName: string) {
        return this.isValid(controlName) ? 'is-valid' : 'is-invalid'
    }

    private hasError(controlName: string, errorType: string): boolean {
        let control = this.getControl(controlName);

        return control?.errors?.[errorType] && (control?.dirty || control?.touched || control.value);
    }

    private isValid(controlName: string): boolean {
        let control = this.getControl(controlName);

        if (control?.valid) {
            return true;
        }

        return control?.dirty || control?.touched || control?.value;
    }

    private getValue(property: IFormProperty): any {
        let value = this.record ? this.record[property.name] : null;

        if (!value && property.required) {
            value = property.defaultValue;
        }

        return value;
    }

    private getControl(controlName: string): AbstractControl<any, any> | null | undefined {
        let control = this.form?.get(controlName)

        const group = this.getGroup(controlName)

        if (group) {
            control = group.get(controlName)
        }

        return control
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
}