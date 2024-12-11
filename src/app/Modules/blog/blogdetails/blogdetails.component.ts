import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/Services/blog.service';
import { changelangService } from 'src/app/Services/changelang.service';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent {
  currentLang: any;
  id:any;
  blog:Blog={} as Blog;
  sanitizedContent: SafeHtml | null = null;

  constructor(
    private _BlogService: BlogService,
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta:Meta , 
    private title: Title,
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    })
    this._BlogService.getBlogById(this.id).subscribe((res) => {
      console.log(res);
      this.blog =res.data;
      this.title.setTitle(this.blog.meta_title);
        this.meta.updateTag({ name: 'description', content: this.blog.meta_description });
        this.meta.updateTag({ name: 'keywords', content: this.blog.meta_keywords });
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
    });

  }
}
