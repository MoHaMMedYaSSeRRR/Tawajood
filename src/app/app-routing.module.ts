import { NotfoundComponent } from './Modules/home/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/services/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/solutions/solutions.module').then(
        (m) => m.SolutionsModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Modules/employment/employment.module').then(
        (m) => m.EmploymentModule
      ),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
