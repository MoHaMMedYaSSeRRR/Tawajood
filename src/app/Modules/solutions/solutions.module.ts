import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionsRoutingModule } from './solutions-routing.module';
import { AllsolutionsComponent } from './allsolutions/allsolutions.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AllsolutionsComponent
  ],
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar', 
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
    }),
  ],
  exports:[AllsolutionsComponent]
})
export class SolutionsModule { }
