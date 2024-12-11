import { HirringComponent } from './hirring/hirring.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JobdettailsComponent } from './jobdettails/jobdettails.component';
import { ApplyjobComponent } from './applyjob/applyjob.component';
const routes: Routes = [
  {path: '', redirectTo: 'hirring', pathMatch: 'full'},
  {path: 'hirring', component:HirringComponent},
  {path: 'jobdetails/:id', component:JobdettailsComponent},
  {path: 'applytojob/:id', component:ApplyjobComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploymentRoutingModule { }
 