import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job';
import { HirringService } from 'src/app/Services/hirring.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';

@Component({
  selector: 'app-jobdettails',
  templateUrl: './jobdettails.component.html',
  styleUrls: ['./jobdettails.component.scss']
})
export class JobdettailsComponent {
id:any;
job:any;
jobContent: SafeHtml = '';
currentLang: any;

constructor(
  private _HirringService:HirringService ,
   private _ActivatedRoute:ActivatedRoute,
   private sanitizer: DomSanitizer,
   private cdr: ChangeDetectorRef,
   private changelangService: changelangService,
   private _translate: TranslateService,

){}
ngOnInit(): void {
  this.changelangService.currentLang$.subscribe((lang) => {
    this._translate.use(lang);
    this.currentLang = lang;
    this.cdr.detectChanges();
  });
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.id = params.get('id');
    }
  })


  this._HirringService.getJobsById(this.id).subscribe({
    next: (res) => {
      this.job = res.data;
      
      // Update job content by adding inline styles to strong and span tags
      let updatedContent = this.job.content;
  
      // Apply styles to <strong> tags
      updatedContent = updatedContent.replace(/<strong>/g, `<strong style="font-size: 24px; font-weight: 700; color: #475156;">`);
  
      // Apply styles to <span> tags
      updatedContent = updatedContent.replace(/<span>/g, `<span style="font-size: 20px; font-weight: 400; color: #475156;">`);
  
      // Sanitize the content
      this.jobContent = this.sanitizer.bypassSecurityTrustHtml(updatedContent);
  
      console.log(this.job);
    },
    error: (error) => {
      console.error('Error:', error);
    }
  });
  
  
}
}

