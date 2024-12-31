import { ChangeDetectorRef, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  isMobile = false;
  filteredBlogs: Blog[] = []; // Filtered blogs based on sorting or topics
  currentTopicId: number | null = null;

  constructor(
    private _BlogService: BlogService,
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private translate: TranslateService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}
  ngOnInit(): void {
    this.setMetaTags();
    this.isMobile = window.innerWidth <= 768;
    this._BlogService.getBlogTopic().subscribe({
      next: (res) => {
        this.blogs = res.data.topics;
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      },
    });
    this.changelangService.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
      this.currentLang = lang;
      this.customOptions.rtl = lang === 'ar';

      this.cdr.detectChanges();
    });
    this._BlogService.getAllBlog().subscribe({
      next: (res) => {
        this.allBlogs = res.data.blogs.map((blog:Blog) => ({
          ...blog,
          plainDescription: this.stripHtmlAndExtractFirstP(blog.description)
        }));
        this.filteredBlogs = [...this.allBlogs];
        console.log(this.filteredBlogs)
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      }
    });
    this.checkRoute();
  }
  stripHtmlAndExtractFirstP(html: string): string {
    if (!html) return ''; // Return an empty string if no HTML content is provided
  
    // Use DOMParser to safely parse the HTML and extract the first <p> tag's text
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const firstP = doc.querySelector('p'); // Select the first <p> tag
  
    // Return the text content of the first <p> tag or an empty string if not found
    return firstP ? firstP.textContent?.trim() || '' : '';
  }
  
  setMetaTags(): void {
    this.translate
      .get(['blog_name', 'blog_description', 'blog_keyword'])
      .subscribe((translations) => {
        this.title.setTitle(translations['blog_name']);

        this.meta.updateTag({
          name: 'description',
          content: translations['blog_description'],
        });

        this.meta.updateTag({
          name: 'keywords',
          content: translations['blog_keyword'],
        });
      });
  }
  sortBlogs(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortOrder = target.value;

    console.log('Sort order selected:', sortOrder); // Debug log
    console.log('Before sorting:', this.filteredBlogs); // Debug log

    this.filteredBlogs = [...this.filteredBlogs].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
    });

    console.log('After sorting:', this.filteredBlogs); // Debug log
    this.cdr.detectChanges();
  }

  filterByTopic(topicId: number | null): void {
    this.currentTopicId = topicId;
    this.filteredBlogs = topicId
      ? this.allBlogs.filter((blog) => blog.topic_id === topicId)
      : [...this.allBlogs];
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
  carouselOptions: OwlOptions = {
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    rtl: true,
    responsive: {
      0: {
        items: 3.2
      },
    }
  };
}
