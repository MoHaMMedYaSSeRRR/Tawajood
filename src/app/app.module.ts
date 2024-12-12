import { LangInterceptor } from './interceptors/lang.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './Modules/home/home.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'; // Add HttpClientModule
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
    HomeModule,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
