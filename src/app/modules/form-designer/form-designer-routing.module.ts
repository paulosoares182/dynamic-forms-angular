import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './pages/create-form/create-form.component';

const routes: Routes = [
  { path: 'new', component: CreateFormComponent },
  { path: 'edit/:id', component: CreateFormComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDesignerRoutingModule { }
