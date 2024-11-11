import { MarketingserviceComponent } from './marketingservice/marketingservice.component';
import { DetailsComponent } from './details/details.component';
import { AllservicesComponent } from './allservices/allservices.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesoloutionsComponent } from './servicesoloutions/servicesoloutions.component';
import { DomainserviceComponent } from './domainservice/domainservice.component';

const routes: Routes = [
  { path: '', redirectTo: 'allservices', pathMatch: 'full' },
  {path:'allservices' , component:AllservicesComponent},
  {path:'service-details' , component:DetailsComponent},
  {path:'soulutionsservices' , component:ServicesoloutionsComponent},
  {path:'domainservice' , component:DomainserviceComponent},
  {path:'marketingservice' , component:MarketingserviceComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
