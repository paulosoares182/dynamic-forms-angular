import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormRoutingModule } from './custom-form-routing.module';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecordComponent } from './pages/record/record.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    FormComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    CustomFormRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ]
})
export class CustomFormModule { }
