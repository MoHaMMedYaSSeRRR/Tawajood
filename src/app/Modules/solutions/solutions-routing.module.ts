import { SoloutionDetailsComponent } from './soloution-details/soloution-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllsolutionsComponent } from './allsolutions/allsolutions.component';

const routes: Routes = [
  {path:'', redirectTo:'solutions', pathMatch: 'full'},
  {path:'solutions' , component: AllsolutionsComponent},
  {path:'solutionDetails/:id' , component:SoloutionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionsRoutingModule { }
