import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { HirringComponent } from './hirring/hirring.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { JobdettailsComponent } from './jobdettails/jobdettails.component';

@NgModule({
  declarations: [
    HirringComponent,
    JobdettailsComponent
  ],
  imports: [
    CommonModule,
    EmploymentRoutingModule,
     TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient],
      },
  }),
  ]
})
export class EmploymentModule { }
