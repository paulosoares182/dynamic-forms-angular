import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'formArray'
})
export class FormArrayPipe implements PipeTransform {

  transform(value: AbstractControl<any, any> | null | undefined, ...args: unknown[]): FormArray {
    return value as FormArray;
  }

}
