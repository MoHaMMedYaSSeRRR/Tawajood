import { CuttextPipe } from './../../pipes/cuttext.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { AllservicesComponent } from './allservices/allservices.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    AllservicesComponent,
    CuttextPipe
    ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    CarouselModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar', 
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AllservicesComponent ,
    CuttextPipe

  ]
})
export class ServicesModule { }
