import { ChangeDetectorRef, Component } from '@angular/core';
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
})
export class AllprojectsComponent {
  isInComponent: boolean = false;
  isMobile = false;

  mobileApp: Project[] = [];
  websites: Project[] = [];
  currentLang!: string;
  constructor(
    private router: Router,
    private _ProjectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _ServicesService: ServicesService
  ) {}
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/projects';
    });
  }
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = lang === 'ar';
      this.cdr.detectChanges();
    });
    this.checkRoute();
    this._ProjectsService.getMobileProjects().subscribe({
      next: (projects) => {
        this.mobileApp = projects.data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this._ProjectsService.getWebProjects().subscribe({
      next: (projects) => {
        this.websites = projects.data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    autoplay: true,
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
        items: 1,
      },
    },
    nav: false,
  };
}
