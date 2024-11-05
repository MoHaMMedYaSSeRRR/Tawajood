import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllprojectsComponent } from './allprojects/allprojects.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: AllprojectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
