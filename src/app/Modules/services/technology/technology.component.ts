import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;
  companyImages = [
    '../../../../assets/images/t-8.png',
    '../../../../assets/images/t-7.png',
    '../../../../assets/images/t-6.png',
    '../../../../assets/images/t-5.png',
    '../../../../assets/images/t-4.png',
    '../../../../assets/images/t-3.png',
    '../../../../assets/images/t-2.png',
    '../../../../assets/images/t-1.png',
  ];
  customOptions: OwlOptions = {
    loop: false,
    rtl: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1200,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
      1100: {
        items: 8,
      },
    },
    nav: false,
  };
  currentLang: any;
  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions = {
        ...this.customOptions,
        rtl: lang === 'en',
      };
      this.cdr.detectChanges();
    });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  goPrev(): void {
    this.owlCarousel.prev();
  }

  goNext(): void {
    this.owlCarousel.next();
  }
}
