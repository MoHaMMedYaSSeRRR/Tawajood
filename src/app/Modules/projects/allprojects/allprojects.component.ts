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
 pageSize: any;
 current: any;
 total: any;
   showPagination: boolean =false;
 ismobile: boolean = false;
  hasBeenInView: boolean = false; // Tracks if `inView` has ever been true
  currentPage: number = 1;
  pages: any[] = [];
  totalPages!: number;
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
        // console.log(this.mobileApp);
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
    this.allProjects = [...this.mobileApp, ...this.websites].sort(() => Math.random() - 0.5);
    // console.log('All Projects:', this.allProjects); // Debugging
    this.displayedProjects = [...this.allProjects];
    this.mobileProject = this.displayedProjects.slice(0, 4);
    
    // Initialize pagination
    this.totalPages = Math.ceil(this.displayedProjects.length / 12);
    this.setPagesToDisplay();
    this.updateDisplayedProjects(2);
  }

  filterProjects(type: number | null , index:number =2): void {
    this.selectedFilter = type;
    
    if (type === null) {
      this.displayedProjects = [...this.allProjects];
    } else {
      this.displayedProjects = this.allProjects.filter(
        (project) => project.type === type
      );
    }
    
    this.currentPage = 1; // Reset to first page
    this.totalPages = Math.ceil(this.displayedProjects.length / 12);
    this.setPagesToDisplay();
    this.updateDisplayedProjects(index);
  }

  pageChanged(page: any): void {
    if (page === '...') {
      return;
    }
    console.log('Current Page:', page);
    this.currentPage = page;
    this.updateDisplayedProjects(1);
    console.log('Displayed Projects:', this.displayedProjects);
  }
  
  updateDisplayedProjects(index:number): void {
    const startIndex = (this.currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    // console.log('Start Index:', startIndex, 'End Index:', endIndex);
    if(index ==1 ){
      this.displayedProjects = this.allProjects.slice(startIndex, endIndex);

    }
    else{
      this.displayedProjects = this.displayedProjects.slice(startIndex, endIndex);
  }

  }

  setPagesToDisplay(): void {
    this.pages = [];
    if (this.totalPages <= 6) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= 4) {
        this.pages = [1, 2, 3, 4, 5, '...', this.totalPages];
      } else if (this.currentPage > 4 && this.currentPage < this.totalPages - 3) {
        this.pages = [
          1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages
        ];
      } else {
        this.pages = [
          1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages
        ];
      }
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChanged(this.currentPage + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChanged(this.currentPage - 1);
    }
  }

}
