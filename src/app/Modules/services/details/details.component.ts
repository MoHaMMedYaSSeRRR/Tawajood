import { changelangService } from 'src/app/Services/changelang.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { TranslateService } from '@ngx-translate/core';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  currentLang: any;
  isInComponent:boolean = false;
  @Input() index! :number ;
  
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
