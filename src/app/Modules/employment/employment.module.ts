import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploymentRoutingModule } from './employment-routing.module';
import { HirringComponent } from './hirring/hirring.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { JobdettailsComponent } from './jobdettails/jobdettails.component';
import { CuttextPipe } from 'src/app/pipes/cuttext.pipe';
import { ApplyjobComponent } from './applyjob/applyjob.component';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    HirringComponent,
    JobdettailsComponent,
    ApplyjobComponent
  ],
  imports: [
    CommonModule,
    ServicesModule,
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