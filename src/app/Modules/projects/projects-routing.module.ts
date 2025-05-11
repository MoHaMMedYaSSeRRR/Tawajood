import { MobileDetailsComponent } from './mobile-details/mobile-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { ProjectsTestComponent } from './projects-test/projects-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: AllprojectsComponent },
  { path: 'mobile/:id', component: MobileDetailsComponent },
  { path: 'projects-test', component: ProjectsTestComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
