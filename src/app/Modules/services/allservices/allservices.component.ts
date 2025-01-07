import { trigger, transition, style, animate, state } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-allservices',
  templateUrl: './allservices.component.html',
  styleUrls: ['./allservices.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('inactive', style({ transform: 'scale(0.5)', opacity: 0 })), // No animation applied
      state('active', style({ transform: 'scale(1)', opacity: 1 })),
      transition('inactive => active', [animate('0.7s ease-in')]),
    ]),
  ],
})
export class AllservicesComponent {
  currentLang: any;
  isInComponent: boolean = false;
  @Input() index!: number;
  @Input() inView!: boolean;

  hasBeenInView: boolean = false; // Tracks if `inView` has ever been true

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inView'] && changes['inView'].currentValue) {
      this.hasBeenInView = true;
    }
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private router: Router,
    private _ServicesService: ServicesService,
    private meta: Meta,
    private title: Title,
    private translate: TranslateService
  ) {}
  isMobile = false;
  services: Service[] = [];
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = lang === 'en';

      this.cdr.detectChanges();
    });
    this.checkRoute();
    this._ServicesService.getServices().subscribe((res) => {
      this.services = res.data.services;
      //  this.title.setTitle(this.services.meta_title);
      //  this.meta.updateTag({ name: 'description', content: this.services.meta_description });
      //  this.meta.updateTag({ name: 'keywords', content: this.services.meta_keywords });
      // console.log(res.data);
      this.services =
        this.index === 6 ? this.services.slice(0, 6) : this.services;
    });
    this.setMetaTags();
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    dotsData: true,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  setMetaTags(): void {
    this.translate
      .get(['service_name', 'service_description', 'service_keyword'])
      .subscribe((translations) => {
        this.title.setTitle(translations['service_name']);

        this.meta.updateTag({
          name: 'description',
          content: translations['service_description'],
        });

        this.meta.updateTag({
          name: 'keywords',
          content: translations['service_keyword'],
        });
      });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/allservices';
    });
  }
  navigateBasedOnId(id: number) {
    switch (id) {
      case 1:
        this.router.navigate(['/service-details', id]);
        break;
      case 3:
        this.router.navigate(['/marketingservice', id]);
        break;
      case 14:
        this.router.navigate(['/domainservice', id]);
        break;
      case 4:
        this.router.navigate(['/soulutionsservices', id]);
        break;
      case 5:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      case 15:
        this.router.navigate(['/marketingservice', id]);
        break;
      case 7:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      default:
        console.warn('No route defined for this ID');
    }
  }
}
