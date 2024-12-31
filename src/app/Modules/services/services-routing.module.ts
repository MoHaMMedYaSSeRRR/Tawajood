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
  {path:'service-details/:id' , component:DetailsComponent},
  {path:'soulutionsservices/:id' , component:ServicesoloutionsComponent},
  {path:'domainservice/:id' , component:DomainserviceComponent},
  {path:'marketingservice/:id' , component:MarketingserviceComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
