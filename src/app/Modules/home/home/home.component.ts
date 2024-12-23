import { trigger, transition, style, animate } from '@angular/animations';
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
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  
    // Slide In Animation from the left (image)
    trigger('slideInLeft', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
  
    // Slide In Animation from the right (content)
    trigger('slideInRight', [
      transition('void => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('scaleIn', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5)' }), // Start from a smaller scale
        animate('1s ease-out', style({ opacity: 1, transform: 'scale(1)' })) // Scale to normal size
      ]) ])
  ]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('numbersSection') numbersSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('whyUsSection') whyUsSection!: ElementRef;

  // Add flags to track if sections have been animated
  section1Animated = false;
  section2Animated = false;
  section3Animated = false;
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
    const observerr = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animation when the section is in view
          const target = entry.target as HTMLElement;
          if (target.id === 'numbersSection' && !this.section1Animated) {
            this.section1Animated = true; // Mark as animated
          }
          if (target.id === 'aboutSection' && !this.section2Animated) {
            this.section2Animated = true;
          }
          if (target.id === 'whyUsSection' && !this.section3Animated) {
            this.section3Animated = true;
          }
          observerr.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 }); // 50% of the element must be in view to trigger the animation

    observerr.observe(this.numbersSection.nativeElement);
    observerr.observe(this.aboutSection.nativeElement);
    observerr.observe(this.whyUsSection.nativeElement);
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
