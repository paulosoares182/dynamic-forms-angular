import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormRoutingModule } from './custom-form-routing.module';
import { FormComponent } from './pages/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    CustomFormRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomFormModule { }
