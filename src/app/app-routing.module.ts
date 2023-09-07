import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'record', loadChildren: () => import('./modules/record/record.module').then(m => m.RecordModule) },
  { path: 'designer', loadChildren: () => import('./modules/form-designer/form-designer.module').then(m => m.FormDesignerModule) },
  { path: '', redirectTo: 'designer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
