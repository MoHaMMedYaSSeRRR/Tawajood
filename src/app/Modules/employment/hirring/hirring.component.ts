import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Job } from 'src/app/interfaces/job';
import { changelangService } from 'src/app/Services/changelang.service';
import { HirringService } from 'src/app/Services/hirring.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-hirring',
  templateUrl: './hirring.component.html',
  styleUrls: ['./hirring.component.scss']
})
export class HirringComponent {
  currentLang: any;
  isInComponent: boolean = false;
  jobs:Job[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private router: Router,
    private _HirringService:HirringService,
    private sanitizer: DomSanitizer
  )
  {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
      this._HirringService.getGobs().subscribe({
        next: (res) => {
          console.log(res);
          this.jobs = res.data.data.map((job: any) => {
            // Extract the first paragraph
            const match = job.content.match(/<p[^>]*>(.*?)<\/p>/);
            return {
              ...job,
              firstParagraph: match && match[1] ? this.sanitizer.bypassSecurityTrustHtml(match[1]) : '', // Add sanitized first paragraph
            };
          });
        },
        error: (error) => {
          console.error('Error getting GOBs', error);
        },
      });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/ourblog';
    });
  }
}