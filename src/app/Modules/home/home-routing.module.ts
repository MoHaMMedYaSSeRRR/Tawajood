import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import {  NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
 { path: '' , component: HomeComponent , pathMatch: 'full'},
 { path: 'home', component: HomeComponent} ,
 { path: 'about', component: AboutComponent},
 { path: 'contact', component: ContactComponent},
 { path: 'privacy', component: PrivacyComponent} 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

 }
