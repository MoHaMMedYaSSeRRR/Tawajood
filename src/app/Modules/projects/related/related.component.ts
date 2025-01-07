import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent {
  @Input() relatedWorks: any[] = []; // Accept relatedWorks as input
  currentLang: any;

  isInComponent: boolean = false;
  isMobile = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1, // Show one image at a time on mobile
      },
      768: {
        items: 2, // Show two images at a time on tablets and small screens
      },
      940: {
        items: 4, // Show four images at a time on larger screens
      },
    },
    nav: false,
  };
   constructor(
      private _ProjectsService: ProjectsService,
      private changelangService: changelangService,
      private _translate: TranslateService,
      private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
  this.isMobile = window.innerWidth <= 768
  this.changelangService.currentLang$.subscribe((lang) => {
    this._translate.use(lang);
    this.currentLang = lang;
    this.cdr.detectChanges();
    this.customOptions.rtl = lang === 'en';
  });
    
  }
}
