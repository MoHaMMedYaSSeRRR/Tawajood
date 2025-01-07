import {
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.scss'],
})
export class MobileDetailsComponent {
  currentLang: any;
  showLayer = false;
  previewImage: string | null = null;
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;
  isInComponent: boolean = false;
  isMobile = false;
  project: any;
  id: any;
  currentImageIndex: number = 0;
  relatedWorks:any[]=[];
  constructor(
    private _ProjectsService: ProjectsService,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _ActivatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
      this.customOptions.rtl = lang === 'en';
    });
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this._ProjectsService.getDetails(this.id).subscribe({
          next: (data) => {
            this.project = data.data.project;
            this.relatedWorks = data.data.relatedProjects;
            console.log(data)
            this.title.setTitle(this.project.meta_title);
            this.meta.updateTag({
              name: 'description',
              content: this.project.meta_description,
            });
            this.meta.updateTag({
              name: 'keywords',
              content: this.project.meta_keywords,
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
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
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1, // Show one image at a time on mobile
      },
      768: {
        items: 2, // Show two images at a time on tablets and small screens
      },
      940: {
        items: 4, // Show four images at a time on larger screens
      },
    },
    nav: false,
  };
  openPreview(image: string): void {
    this.currentImageIndex = this.project.images.findIndex(
      (img: string) => img === image
    );
    this.previewImage = image;
    this.showLayer = true;
  }

  closePreview(event: Event): void {
    event.stopPropagation();
    this.showLayer = false;
    this.previewImage = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.showLayer) {
      switch (event.key) {
        case 'Escape':
          this.closePreview(event);
          break;
        case 'ArrowLeft':
          this.goPrevPhoto();
          break;
        case 'ArrowRight':
          this.goNextPhoto();
          break;
      }
    }
  }
  isValidUrl(url: string): boolean {
    return /^(https?:\/\/)/.test(url);
  }  
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  goPrev(): void {
    this.owlCarousel.prev(); // Navigate to the previous item
    this.cdr.detectChanges(); // Trigger change detection to update the view
  }

  goNext(): void {
    this.owlCarousel.next();
    this.cdr.detectChanges();
  }

  goPrevPhoto(): void {
    if (this.project && this.project.images) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.project.images.length) %
        this.project.images.length;
      this.previewImage = this.project.images[this.currentImageIndex].image;
    }
  }

  goNextPhoto(): void {
    if (this.project && this.project.images) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.project.images.length;
      this.previewImage = this.project.images[this.currentImageIndex].image;
    }
  }
}
