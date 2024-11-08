import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { About } from 'src/app/interfaces/about';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  @ViewChild('numbersSection') numbersSection!: ElementRef;
 
  
  currentLang!: string;
  about: About[] = [];
 yearsExperience = 0;
 happyClients = 0;
 completedProjects = 0;
  allTeam: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _HomeService: HomeService
  ) {}

  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    this._HomeService.getAbout().subscribe((res: any) => {
      this.about = res.data.Setting;
    });
    this._HomeService.getTeam().subscribe({
      next:(res)=>{
        this.allTeam=res.data;
        this.splitTeams();
      }
    })
  }
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounter('yearsExperience', 8);
          this.startCounter('happyClients', 100);
          this.startCounter('completedProjects', 1000);
          observer.unobserve(entry.target); 
        }
      });
    });
    observer.observe(this.numbersSection.nativeElement);
    if (this.owlTop && this.owlBottom) {
      this.owlTop.owl.carousel({
        items: 4,
        nav: false,
        loop: true,
        slideBy: 1,
      });

      this.owlBottom.owl.carousel({
        items: 4,
        nav: false,
        loop: true,
        slideBy: 1,
      });
    }
  }

  startCounter(property: 'yearsExperience' | 'happyClients' | 'completedProjects', target: number) {
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

  firstRowItems: any[] = [];
  secondRowItems: any[] = [];
  @ViewChild('owlTop') owlTop: any;
  @ViewChild('owlBottom') owlBottom: any;
  splitTeams() {
    const middleIndex = Math.floor(this.allTeam.length / 2);

    this.firstRowItems = this.allTeam.slice(0, middleIndex);
    this.secondRowItems = this.allTeam.slice(middleIndex);
  }

  // Owl carousel configuration
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 4, // Show 4 items at a time
    margin: 10,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 4
      }
    },
    nav: false,  // Disable navigation arrows here
    slideBy: 1,  // Slide one item at a time
    responsiveRefreshRate: 100,
  };
  goNext() {
    this.owlTop.next();
    this.owlBottom.next();
  }

  goPrev() {
    this.owlTop.prev();
    this.owlBottom.prev();
  }
}
