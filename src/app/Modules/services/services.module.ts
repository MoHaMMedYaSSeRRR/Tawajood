import { ToastrModule } from 'ngx-toastr';
import { CuttextPipe } from './../../pipes/cuttext.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { AllservicesComponent } from './allservices/allservices.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DetailsComponent } from './details/details.component';
import { TechnologyComponent } from './technology/technology.component';
import { ProjectsModule } from "../projects/projects.module";
import { QuestionsComponent } from './questions/questions.component';
import { ServicesoloutionsComponent } from './servicesoloutions/servicesoloutions.component';
import { ProjectlifeComponent } from './projectlife/projectlife.component';
import { DomainserviceComponent } from './domainservice/domainservice.component';
import { MarketingserviceComponent } from './marketingservice/marketingservice.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllservicesComponent,
    CuttextPipe,
    DetailsComponent,
    TechnologyComponent,
    QuestionsComponent,
    ServicesoloutionsComponent,
    ProjectlifeComponent,
    DomainserviceComponent,
    MarketingserviceComponent
    ], 
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
        defaultLanguage: 'ar',
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
            deps: [HttpClient],
        },
    }),
    ProjectsModule
],
  exports: [AllservicesComponent ,
    CuttextPipe

  ]
})
export class ServicesModule { }
