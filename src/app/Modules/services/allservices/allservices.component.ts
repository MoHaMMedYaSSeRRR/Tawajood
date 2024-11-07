import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-allservices',
  templateUrl: './allservices.component.html',
  styleUrls: ['./allservices.component.scss']
})
export class AllservicesComponent {
currentLang: any;
isInComponent:boolean = false;

constructor(private cdr: ChangeDetectorRef , 
  private changelangService: changelangService ,
  private _translate:TranslateService,private router: Router,
  private _ServicesService:ServicesService
) {}
isMobile=false;
  services:Service[]=[];
ngOnInit(): void {
  this.isMobile=window.innerWidth<=768;
  this.changelangService.currentLang$.subscribe((lang) => {
    this._translate.use(lang);
    this.currentLang = lang;
    this.customOptions.rtl = (lang === 'ar');

    this.cdr.detectChanges(); 
  });
  this.checkRoute();
  this._ServicesService.getServices().subscribe(
    (res) => { 
     this.services =res.data.services;
    }
  );
  
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


onLanguageChange() {
  this.cdr.detectChanges();
}
checkRoute(): void {
  this.router.events.subscribe(() => {
    this.isInComponent = this.router.url === '/allservices';
 });
}
}
