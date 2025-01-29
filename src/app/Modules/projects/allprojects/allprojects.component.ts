import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Project } from 'src/app/interfaces/project';
import { changelangService } from 'src/app/Services/changelang.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.scss'],
  animations: [
      trigger('zoomIn', [
        state('inactive', style({ transform: 'scale(0.5)', opacity: 0 })), // No animation applied
        state('active', style({ transform: 'scale(1)', opacity: 1 })),
        transition('inactive => active', [animate('0.7s ease-in')]),
      ]),
    ],
})
export class AllprojectsComponent {
  isInComponent: boolean = false;
  isMobile = false;
  url: string = '';
  mobileApp: Project[] = [];
  websites: Project[] = [];
  allProjects: Project[] = [];
  displayedProjects: Project[] = [];
  currentLang!: string;
  selectedFilter: number | null = null; // Tracks the active filter
  mobileProject: Project[] = [];
 @Input() inView!: boolean;

  hasBeenInView: boolean = false; // Tracks if `inView` has ever been true

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inView'] && changes['inView'].currentValue) {
      this.hasBeenInView = true;
    }
  }
  constructor(
    private router: Router,
    private _ProjectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private translate: TranslateService,
    private meta: Meta,
    private title: Title,
    private renderer: Renderer2
  ) {}
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/projects';
      this.url = this.router.url;
    });
  }
  ngOnInit(): void {
    this.limitDotsForMobile();
    this.setMetaTags();
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = lang === 'en';
      this.mobileCustomOptions.rtl = lang === 'en';
      this.mobileOptions.rtl = lang === 'en';

      this.cdr.detectChanges();
    });
    this.checkRoute();
    this.fetchProjects(); 
   
  }
  customOptions: OwlOptions = { 
    loop: true,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    dots: true, // Enable dots navigation
    dotsData: false,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        dotsEach: 3
        
      },
    },
    nav: false,
  };
  mobileOptions: OwlOptions = { 
    loop: true,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    dots: true, // Enable dots navigation
    dotsData: false,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2.1,
        dotsEach: 3
        
      },
    },
    nav: false,
  };
  mobileCustomOptions: OwlOptions = { 
    loop: true,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1200,
    smartSpeed: 200,
    touchDrag: true,
    pullDrag: true,
    dots: true, // Enable dots navigation
    dotsData: true,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1.7, 
         
      },
    },
    nav: false,
  };
  limitDotsForMobile(): void {
    const owlDots = document.querySelectorAll('.owl-dots .owl-dot');
    if (window.innerWidth <= 600) {
      owlDots.forEach((dot, index) => {
        const displayStyle = index < 3 ? 'inline-block' : 'none';
        this.renderer.setStyle(dot, 'display', displayStyle); // Show only the first 3 dots
      });
    }
  }
  fetchProjects(): void {
    this._ProjectsService.getMobileProjects().subscribe({
      next: (projects) => {
        this.mobileApp = projects.data;
        this.combineAndRandomizeProjects();
      },
      error: (error) => {
        console.error(error);
      },
    });

    this._ProjectsService.getWebProjects().subscribe({
      next: (projects) => {
        this.websites = projects.data;
        this.combineAndRandomizeProjects();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  setMetaTags(): void {
    this.translate
      .get(['project_name', 'project_description', 'project_keyword'])
      .subscribe((translations) => {
        this.title.setTitle(translations['project_name']);

        this.meta.updateTag({
          name: 'description',
          content: translations['project_description'],
        });

        this.meta.updateTag({
          name: 'keywords',
          content: translations['project_keyword'],
        });
      });
  }

  combineAndRandomizeProjects(): void {
    // Combine and randomize projects
    this.allProjects = [...this.mobileApp, ...this.websites].sort(
      () => Math.random() - 0.5
    );
    this.displayedProjects = [...this.allProjects];
    this.mobileProject=this.displayedProjects.slice(0,4)
  }

  filterProjects(type: number | null): void {
    this.selectedFilter = type; // Update the active filter

    if (type === null) {
      this.displayedProjects = [...this.allProjects];
    } else {
      this.displayedProjects = this.allProjects.filter(
        (project) => project.type === type
      );
    }
  }
}
