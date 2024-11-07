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
    private cdr: ChangeDetectorRef

  ){}
  services:Service[]=[];
  currentLang: any;

  ngOnInit(): void {
    this._ServicesService.getServices().subscribe(res => {
      console.log(res);
      this.services = res.data.services;
      console.log(this.services)
        });
        this.changelangService.currentLang$.subscribe((lang) => {
          this._translate.use(lang);
          this.currentLang = lang;
          this.cdr.detectChanges();
        });
  }
}
