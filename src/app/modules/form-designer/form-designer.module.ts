import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignerRoutingModule } from './form-designer-routing.module';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    FormDesignerRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class FormDesignerModule { }
