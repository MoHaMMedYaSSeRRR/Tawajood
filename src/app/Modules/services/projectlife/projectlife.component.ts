import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-projectlife',
  templateUrl: './projectlife.component.html',
  styleUrls: ['./projectlife.component.scss']
})
export class ProjectlifeComponent {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;
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
  process: any;
  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _HomeService: HomeService
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
    this._HomeService.getProccess().subscribe({
      next: (res) => {
        this.process = res.data.data;
      },
      error: (err) => {
        console.log(err);
      }
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
