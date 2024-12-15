import { changelangService } from 'src/app/Services/changelang.service';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/Services/services.service';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { SoloutionsService } from 'src/app/Services/soloutions.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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
  specificationList: { title: string; description: string }[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private translate: TranslateService,
    private _SoloutionsService: SoloutionsService,
    private _ActivatedRoute: ActivatedRoute,
    private meta:Meta,
    private title: Title,
  ) {}
  soloution: any;
  id: any;
  isMobile = false;
  services: Service[] = [];
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.changelangService.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
      this.currentLang = lang;

      this.cdr.detectChanges();
    });
    this._SoloutionsService.getSoloutionsByid(this.id).subscribe({
      next: (res) => {
        this.soloution = res.data;
        console.log(res.data)
        this.title.setTitle(this.soloution.meta_title);
        this.meta.updateTag({ name: 'description', content: this.soloution.meta_description });
        this.meta.updateTag({ name: 'keywords', content: this.soloution.meta_keywords });
        if (this.soloution.specifications) {
          this.soloution.specifications = this.stripHtml(
            this.soloution.specifications
          );
        }
        this.specificationList=this.soloution.specifications.split('\n').map((line:any) => {
          const [title, description] = line.split(':').map((part:any) => part.trim());
          return { title, description };
        });
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
 
  stripHtml(html: string): string {
    if (!html) {
      return '';
    }
    return html
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
      .trim(); // Remove extra whitespace
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
      },
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
