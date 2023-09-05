import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'form', loadChildren: () => import('./modules/custom-form/custom-form.module').then(m => m.CustomFormModule) },
  { path: 'designer', loadChildren: () => import('./modules/form-designer/form-designer.module').then(m => m.FormDesignerModule) },
  { path: '', redirectTo: 'designer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
