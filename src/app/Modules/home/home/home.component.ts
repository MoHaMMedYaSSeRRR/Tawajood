import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { About } from 'src/app/interfaces/about';
import { Slider } from 'src/app/interfaces/slider';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('numbersSection') numbersSection!: ElementRef;

  headerContent: Slider[] = [];
  currentLang!: string;
  about: About[] = [];
  isMobile: boolean=false;
  // Counter values
  yearsExperience = 0;
  happyClients = 0;
  completedProjects = 0;
  whyUs: any[] =[];
  contactUs: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _HomeService: HomeService,
    private meta: Meta,
    private titleService: Title,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions = {
        ...this.customOptions,
        rtl: lang === 'en',
      };
      this.cdr.detectChanges();
      this.setMetaTags();
    });

    this._HomeService.getSlider().subscribe((res: any) => {
      this.headerContent = res.data.sliders;
    });

    this._HomeService.getAbout().subscribe((res: any) => {
      this.about = res.data.Setting;
    });
    this._HomeService.whyus().subscribe({
      next: (res) => {
        this.whyUs = res.data.why_us;
        console.log(this.whyUs);
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._HomeService.getContactUs().subscribe((res: any) => {
      this.contactUs = res.data.contact_us;
    });
    this.setMetaTags();
  }

  setMetaTags(): void {
    this.translate
      .get(['company_name', 'meta_description', 'meta_keywords'])
      .subscribe((translations) => {
        this.titleService.setTitle(translations['company_name']);

        this.meta.updateTag({
          name: 'description',
          content: translations['meta_description'],
        });

        this.meta.updateTag({
          name: 'keywords',
          content: translations['meta_keywords'],
        });
      });
  }
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCounter(
            'yearsExperience',
            this.contactUs.years_of_experience
          );
          this.startCounter('happyClients', this.contactUs.happy_customers);
          this.startCounter(
            'completedProjects',
            this.contactUs.project_numbers
          );
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(this.numbersSection.nativeElement);
    this.setMetaTags();
  }

  startCounter(
    property: 'yearsExperience' | 'happyClients' | 'completedProjects',
    target: number
  ) {
    let current = 0;
    const step = Math.ceil(target / 100);
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
        this[property] = target;
      } else {
        this[property] = current;
        current += step;
      }
      this.cdr.detectChanges();
    }, 50);
  }

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
  };
}
