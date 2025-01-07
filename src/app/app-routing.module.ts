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
    path: 'hirring',  // Use a unique path here
    loadChildren: () =>
      import('./Modules/employment/employment.module').then(
        (m) => m.EmploymentModule
      ),
  },
  {
    path: 'services',  // Use a unique path here
    loadChildren: () =>
      import('./Modules/services/services.module').then(
        (m) => m.ServicesModule
      ),
  },
  {
    path: 'solutions',  // Use a unique path here
    loadChildren: () =>
      import('./Modules/solutions/solutions.module').then(
        (m) => m.SolutionsModule
      ),
  },
  {
    path: 'projects',  // Use a unique path here
    loadChildren: () =>
      import('./Modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
  {
    path: 'blog',  // Use a unique path here
    loadChildren: () =>
      import('./Modules/blog/blog.module').then((m) => m.BlogModule),
  },
  { path: '**', component: NotfoundComponent },  // Fallback for unknown routes
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
