import { OurblogComponent } from './ourblog/ourblog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';

const routes: Routes = [
  {path: '', redirectTo:'ourblog', pathMatch:'full'},
  {path: 'ourblog', component:OurblogComponent},
  {path: 'blogdetails/:id', component:BlogdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
