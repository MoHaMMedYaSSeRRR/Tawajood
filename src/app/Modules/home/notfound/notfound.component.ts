import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.cdr.detectChanges();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
