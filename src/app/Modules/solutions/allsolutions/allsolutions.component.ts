import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';
import { SoloutionsService } from 'src/app/Services/soloutions.service';

@Component({
  selector: 'app-allsolutions',
  templateUrl: './allsolutions.component.html',
  styleUrls: ['./allsolutions.component.scss']
})
export class AllsolutionsComponent {
  currentLang: any;
  @Input() index! :number ;

  isInComponent:boolean = false;
  isMobile:boolean = false;
  constructor( private router: Router ,
    private cdr: ChangeDetectorRef , 
  private changelangService: changelangService ,
  private _translate:TranslateService,
  private _SoloutionsService:SoloutionsService,
  private meta: Meta,
    private title: Title,
  ){
  }
  checkRoute(): void {
    this.isMobile=window.innerWidth<=768;
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/solutions';
   });
  }
  solutions:any;
  ngOnInit(): void {
    this.checkRoute();
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = (lang === 'ar');
  
      this.cdr.detectChanges(); 
    });
    this._SoloutionsService.getSoloutions().subscribe({
      next: (res) => {
        this.solutions = res.data.solutions;
        this.title.setTitle(this.solutions.meta_title);
        this.meta.updateTag({ name: 'description', content: this.solutions.meta_description });
        this.meta.updateTag({ name: 'keywords', content: this.solutions.meta_keywords });
      },
      error: (error) => {
        console.log(error);
      }
    })
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
    dots: true,           // Enable dots navigation
    dotsData: true,     navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  };
}
