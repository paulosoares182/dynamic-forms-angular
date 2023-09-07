import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormArrayPipe } from './pipes/form-array.pipe';

@NgModule({
  declarations: [
    FormArrayPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormArrayPipe
  ]
})
export class CoreModule { }
