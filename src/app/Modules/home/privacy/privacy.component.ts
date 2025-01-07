import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {
  constructor(
    private _HomeService: HomeService,
    private changelangService: changelangService,
    private cdr: ChangeDetectorRef,
    private _translate:TranslateService
  ) {}
  currentLang: any;
  privacy: any;

  ngOnInit(): void {
    this._HomeService.getAbout().subscribe({
      next: (res) => {
        this.privacy = res.data.Setting;
      },
    });
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
  }
}
