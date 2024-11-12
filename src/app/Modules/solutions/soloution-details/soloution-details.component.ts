import { changelangService } from 'src/app/Services/changelang.service';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/Services/services.service';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-soloution-details',
  templateUrl: './soloution-details.component.html',
  styleUrls: ['./soloution-details.component.scss'],
})
export class SoloutionDetailsComponent {
  currentLang: any;
  isInComponent: boolean = false;
  @Input() index!: number;
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService
  ) {}
  isMobile = false;
  services: Service[] = [];
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;

      this.cdr.detectChanges();
    });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      940: {
        items: 4,
      }
    },
    nav: false,
  };
  goPrev(): void {
    this.owlCarousel.prev();
  }

  goNext(): void {
    this.owlCarousel.next();
  }
}
