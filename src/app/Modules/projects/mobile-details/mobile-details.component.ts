import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.scss']
})
export class MobileDetailsComponent {
  currentLang: any;
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;
  isInComponent: boolean = false;
  isMobile = false;
  project:any;
  id:any
  constructor(
    private _ProjectsService: ProjectsService,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _ActivatedRoute:ActivatedRoute , 
    private title: Title,
    private meta: Meta,
  ) {}
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id);
      }
    })
    this._ProjectsService.getDetails(this.id).subscribe({
      next: (data) => {
        this.project=data.data;
        console.log(this.project)
        this.title.setTitle(this.project.meta_title);
        this.meta.updateTag({ name: 'description', content: this.project.meta_description });
        this.meta.updateTag({ name: 'keywords', content: this.project.meta_keywords });
      },
      error: (error) => {
        console.log(error);
      },
    })
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
