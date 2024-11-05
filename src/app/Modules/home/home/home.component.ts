import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { About } from 'src/app/interfaces/about';
import { Slider } from 'src/app/interfaces/slider';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headerContent:Slider[]=[];
  currentLang!: string;
  about:About[]=[];
  constructor(private cdr: ChangeDetectorRef , 
    private changelangService: changelangService ,
    private _translate:TranslateService,
    private _HomeService:HomeService
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.customOptions = {
        ...this.customOptions,
        rtl: lang === 'en'      };
      this.cdr.detectChanges(); 
    });
    this._HomeService.getSlider().subscribe((res: any) => {
      this.headerContent = res.data.sliders;
    });
    this._HomeService.getAbout().subscribe((res: any) => {
      this.about = res.data.Setting;
      console.log(this.about);
    });
  }

  onLanguageChange() {
    this.cdr.detectChanges();
  }
  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
  };

}

