import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MobileDetailsComponent } from './mobile-details/mobile-details.component';
import { WepDetailsComponent } from './wep-details/wep-details.component';
import { RelatedComponent } from './related/related.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsTestComponent } from './projects-test/projects-test.component';


@NgModule({
  declarations: [
    AllprojectsComponent,
    MobileDetailsComponent,
    WepDetailsComponent,
    RelatedComponent,
    ProjectsTestComponent 
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ProjectsRoutingModule,
    NgxPaginationModule ,
    TranslateModule.forRoot({
      defaultLanguage: 'ar', 
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    AllprojectsComponent
  ]
})
export class ProjectsModule { }
