import { ChangeDetectorRef, Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-domainservice',
  templateUrl: './domainservice.component.html',
  styleUrls: ['./domainservice.component.scss']
})
export class DomainserviceComponent {
  currentLang: any;
  isInComponent:boolean = false;
  id:any;
  service:any;
  whyus:any;
  constructor(private cdr: ChangeDetectorRef , 
    private changelangService: changelangService ,
    private _translate:TranslateService,
    private _ServicesService:ServicesService,
    private _ActivatedRoute:ActivatedRoute,
    private _HomeService:HomeService,
    private title: Title,
    private meta: Meta,
  ) {}
  isMobile=false;
    services:Service[]=[];
  ngOnInit(): void {
    this.isMobile=window.innerWidth<=768;
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
  
      this.cdr.detectChanges(); 
    });
    this._ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
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
