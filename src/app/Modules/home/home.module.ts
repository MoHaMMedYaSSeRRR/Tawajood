import { ServicesModule } from './../services/services.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SolutionsModule } from "../solutions/solutions.module";
import { ProjectsModule } from "../projects/projects.module";
import { BlogModule } from "../blog/blog.module";
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoadingComponent } from './loading/loading.component';
import { EmptystatusComponent } from './emptystatus/emptystatus.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SubmitComponent } from './submit/submit.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NotfoundComponent,
    LoadingComponent,
    EmptystatusComponent,
    PrivacyComponent,
    SubmitComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        defaultLanguage: 'ar',
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
            deps: [HttpClient],
        },
    }),
    ServicesModule,
    SolutionsModule,
    ProjectsModule,
    BlogModule,
    ToastrModule.forRoot()
  ] , 
  exports: [
    NavbarComponent,
    FooterComponent , 
    LoadingComponent ,
    EmptystatusComponent
  ]
})
export class HomeModule { }
 