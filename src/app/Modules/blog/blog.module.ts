import { ServicesModule } from './../services/services.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { OurblogComponent } from './ourblog/ourblog.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CompanyComponent } from './company/company.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';


@NgModule({
  declarations: [
    OurblogComponent,
    CompanyComponent,
    BlogdetailsComponent 
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    CarouselModule,
    ServicesModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient],
      },
  }),
  ] ,
  exports:[
    OurblogComponent ,
    CompanyComponent
  ]
})
export class BlogModule { }
