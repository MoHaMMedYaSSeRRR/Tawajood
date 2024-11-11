import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-domainservice',
  templateUrl: './domainservice.component.html',
  styleUrls: ['./domainservice.component.scss']
})
export class DomainserviceComponent {
  currentLang: any;
  isInComponent:boolean = false;
  
  constructor(private cdr: ChangeDetectorRef , 
    private changelangService: changelangService ,
    private _translate:TranslateService,
    private _ServicesService:ServicesService
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
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }

}
