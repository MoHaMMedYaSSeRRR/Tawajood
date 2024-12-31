import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;
  companyImages = [
    '../../../../assets/images/company-8.png',
    '../../../../assets/images/company-7.png',
    '../../../../assets/images/company-6.png',
    '../../../../assets/images/company-5.png',
    '../../../../assets/images/company-4.png',
    '../../../../assets/images/company-3.png',
    '../../../../assets/images/company-2.png',
    '../../../../assets/images/company-1.png',
  ];
  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
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
        items: 7,
      },
    },
    nav: false,
  };
  currentLang: any;
  partner:any;
  constructor(
    private Router: Router,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _HomeService:HomeService
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
    this._HomeService.getpartners().subscribe({
      next: (res) => {
        this.partner = res.data.clients;
      },
      error: (error) => {
        console.log(error);
      },
    })
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
