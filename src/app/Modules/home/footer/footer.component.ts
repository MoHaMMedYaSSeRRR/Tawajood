import { Router } from '@angular/router';
import { changelangService } from './../../../Services/changelang.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/Services/services.service';
import { HomeService } from 'src/app/Services/home.service';
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
    private router:Router,
    private _HomeService:HomeService

  ){}
  isMobile:boolean = false;
  services:Service[]=[];
  currentLang: any;
  contactUS:any;
  isIraq: boolean = false;
  isEgypt: boolean = false;
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
        this._HomeService.getContactUs().subscribe({
          next: (res) => {
            this.contactUS = res.data.contact_us;
          },
          error: (err) => {
            console.log('Error:', err);
          }
        })
       this._HomeService.checkIp().subscribe({
        next: (res) => {
          this.isIraq = res.country_code === 'IQ';
          this.isEgypt =  res.country_code === 'EG';
        },
        error: (err) => {
          console.log('Error:', err);
        }
       })
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
