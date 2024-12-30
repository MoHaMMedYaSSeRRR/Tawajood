import { Router } from '@angular/router';
import { changelangService } from './../../../Services/changelang.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/Services/services.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  settings:any ={
    whatsapp:'01024848723',
    instgram:'',
    facebook:'',
    email:'info@tawajood.com'

  };
  constructor(private _ServicesService:ServicesService ,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private router:Router

  ){}
  isMobile:boolean = false;
  services:Service[]=[];
  currentLang: any;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this._ServicesService.getServices().subscribe(res => {
      this.services = res.data.services;
        });
        this.changelangService.currentLang$.subscribe((lang) => {
          this._translate.use(lang);
          this.currentLang = lang;
          this.cdr.detectChanges();
        });
  }
  navigateBasedOnId(id: number) {
    switch (id) {
      case 1:
        this.router.navigate(['/service-details', id]);
        break;
      case 3:
        this.router.navigate(['/marketingservice', id]);
        break;
      case 14:
        this.router.navigate(['/domainservice', id]);
        break;
      case 4:
        this.router.navigate(['/soulutionsservices', id]);
        break;
      case 5:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      case 15:
        this.router.navigate(['/marketingservice', id]);
        break;
      case 7:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      default:
        console.warn('No route defined for this ID');
    }
  }
}
