import { changelangService } from 'src/app/Services/changelang.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/Services/services.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  currentLang: any;
  isInComponent: boolean = false;
  @Input() index!: number;
  service: any;
  id: any;
  whyus:any;
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _ServicesService: ServicesService,
    private _ActivatedRoute: ActivatedRoute,
    private _HomeService:HomeService,
    private meta: Meta,
    private title: Title, 
  ) {}
  isMobile = false; 
  services: Service[] = [];
  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;

      this.cdr.detectChanges();
    });
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getServiceDetails();
    this._HomeService.whyus().subscribe({ 
      next: (res) => {
        this.whyus = res.data.why_us;
        // console.log(this.whyus)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getServiceDetails(): void {
    this._ServicesService.getServicesDetails(this.id).subscribe({
      next: (res) => {
        this.service = res.data;
        // console.log(res);

        // Set meta tags
        this.title.setTitle(this.service.meta_title);
        this.meta.updateTag({ name: 'description', content: this.service.meta_description });
        this.meta.updateTag({ name: 'keywords', content: this.service.meta_keywords });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
}
