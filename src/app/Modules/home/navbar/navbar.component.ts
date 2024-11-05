import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() languageChanged = new EventEmitter<void>();

  isNavOpen:boolean = false;
  scrollY: number = 0;
  currentLang: string = 'ar'; 

  constructor( private _TranslateService:changelangService ,
    private _translae:TranslateService
  ){
    this._TranslateService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this._translae.use(lang);
      this.updateLayoutDirection();
      this.languageChanged.emit();

    });
  }

  ngOnInit(): void {
    this._TranslateService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this._translae.use(lang); 
      this.updateLayoutDirection();
      this.languageChanged.emit();

        });
    
  }

  toggleLanguage(): void {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this._TranslateService.toggleLanguage();
    this.currentLang = newLang;
    this.updateLayoutDirection();
  }


  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;

    if(this.isNavOpen){
      this.disableBodyScroll
    }
    else {
      this.enableBodyScroll();
    }
  }
  closeNav(): void {
    this.isNavOpen = false;
    this.enableBodyScroll();
  }
  private disableBodyScroll(): void {
    this.scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scrollTo(0, this.scrollY);
  }
  private updateLayoutDirection(): void {
    const direction = this.currentLang === 'ar' ? 'ltr' : 'rtl';
    document.body.style.direction = direction;
  }
}
