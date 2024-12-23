import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class changelangService  {
  private currentLangSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  currentLang$ = this.currentLangSubject.asObservable();
  languageChanged$ = new Subject<void>();

  constructor() {
    const savedLang = localStorage.getItem('currentLang') || 'ar';
    this.currentLangSubject.next(savedLang);
   }

  private getInitialLanguage(): string {
    return localStorage.getItem('lang') || 'ar'; 
  }

  getCurrentLanguage(): string {
    return this.currentLangSubject.getValue();
  }

  toggleLanguage(): void {
    const newLang = this.currentLangSubject.getValue() === 'en' ? 'ar' : 'en';
    this.currentLangSubject.next(newLang);
    localStorage.setItem('currentLang', newLang);
    this.languageChanged$.next();
  } 
  

  setCurrentLang(lang: string) {
    this.currentLangSubject.next(lang);
  }
}
