import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
@Input() index! :number ;

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
     console.log(this.services)
     this.services= (this.index === 6) ? this.services.slice(0, 6) : this.services;
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
  dots: true,
  dotsData: true,   navSpeed: 1200,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    }
  },
};


onLanguageChange() {
  this.cdr.detectChanges();
}
checkRoute(): void {
  this.router.events.subscribe(() => {
    this.isInComponent = this.router.url === '/allservices';
 });
}
navigateBasedOnId(id: number) {
  switch (id) {
    case 1:
      this.router.navigate(['/service-details']);
      break;
    case 3:
      this.router.navigate(['/marketingservice']);
      break;
    case 6:
      this.router.navigate(['/domainservice']);
      break;
    case 4:
      this.router.navigate(['/soulutionsservices']);
      break;
    case 5:
      window.open('https://wa.me/01024848723', '_blank');
      break;
    default:
      console.warn('No route defined for this ID');
  }
}
}
