import { ChangeDetectorRef, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-marketingservice',
  templateUrl: './marketingservice.component.html',
  styleUrls: ['./marketingservice.component.scss'],
})
export class MarketingserviceComponent {
  currentLang: any;
  isInComponent: boolean = false;
  service: any;
  id: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _ServicesService: ServicesService,
    private meta: Meta,
    private title: Title,
    private _ActivatedRoute: ActivatedRoute
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
  }
  getServiceDetails(): void {
    this._ServicesService.getServicesDetails(3).subscribe({
      next: (res) => {
        this.service = res.data;
        console.log(res);

        // Set meta tags
        this.title.setTitle(this.service.meta_title);
        this.meta.updateTag({
          name: 'description',
          content: this.service.meta_description,
        });
        this.meta.updateTag({
          name: 'keywords',
          content: this.service.meta_keywords,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLanguageChange() {
    this.cdr.detectChanges();
  }
}
