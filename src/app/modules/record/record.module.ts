import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
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
    RecordRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ]
})
export class RecordModule { }
