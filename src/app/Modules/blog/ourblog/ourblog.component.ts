import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/Services/blog.service';
import { changelangService } from 'src/app/Services/changelang.service';

@Component({
  selector: 'app-ourblog',
  templateUrl: './ourblog.component.html',
  styleUrls: ['./ourblog.component.scss'],
})
export class OurblogComponent {
  blogs: Blog[] = [];
  allBlogs: Blog[] = [];
  currentLang: any;
  isInComponent: boolean = false;
  isMobile=false;
  constructor(
    private _BlogService: BlogService,
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isMobile=window.innerWidth<=768;
    this._BlogService.getBlogTopic().subscribe({
      next: (res) => {
        this.blogs = res.data.topics;
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      },
    });
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = (lang === 'ar');

      this.cdr.detectChanges();
    });
    this._BlogService.getAllBlog().subscribe({
      next: (res) => {
        this.allBlogs = res.data.blogs.slice(0,3);
      }
    })
    this.checkRoute();
  }

  onLanguageChange() {
    this.cdr.detectChanges();
  }
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/ourblog';
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
    dots: false,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };
}
