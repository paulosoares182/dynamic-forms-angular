import { AbstractControl, FormGroup } from "@angular/forms";

export abstract class FormBase {
    protected form?: FormGroup;
   
    abstract onSubmit(): void;
    abstract onSuccessfullySubmitted(): void;
    abstract onFailureSubmitted(): void;

    protected getGroup(controlName: string): FormGroup | null {
        const control = this.form?.get(controlName);

        if (!(control instanceof FormGroup)) {
            return null;
        }

        return control as FormGroup;
    }

    protected reset(): void {
        this.form?.reset();
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

    private getControl(controlName: string): AbstractControl<any, any> | null | undefined {
        let control = this.form?.get(controlName)

        const group = this.getGroup(controlName)

        if (group) {
            control = group.get(controlName)
        }

        return control
    }
}