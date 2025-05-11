import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';
import { SoloutionsService } from 'src/app/Services/soloutions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() languageChanged = new EventEmitter<void>();
  isDropdownVisible = false;
  issoloutionsVisible = false;
  isNavOpen: boolean = false;
  scrollY: number = 0;
  currentLang: string = 'ar';
  services: Service[] = [];
  soloutions:any[]=[];
  isMobile: boolean = false;
  email='info@tawajood.com';
  constructor(
    private _TranslateService: changelangService,
    private _translae: TranslateService,
    private _ServicesService: ServicesService,
    private router: Router,
    private _SoloutionsService: SoloutionsService
  ) {
    this._TranslateService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
      this._translae.use(lang);
      this.updateLayoutDirection();
      this.languageChanged.emit();
    });
    this._ServicesService.getServices().subscribe({
      next: (res) => {
        this.services = res.data.services;
      },
    });
    this._SoloutionsService.getSoloutions().subscribe({
      next: (res) => {
        this.soloutions = res.data.solutions;
      },
    })
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth<=768;
    this._TranslateService.currentLang$.subscribe((lang) => {
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

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;

    if (this.isNavOpen) {
      this.disableBodyScroll;
    } else {
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
      case 15:
        this.router.navigate(['/marketingservice', id]);
        break;
      case 4:
        this.router.navigate(['/soulutionsservices', id]);
        break;
      case 5:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      case 7:
        window.open('https://wa.me/+201024848723', '_blank');
        break;
      default:
        console.warn('No route defined for this ID');
    }
  }
  isFixed = false;
  isHidden = false;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
  if(!this.isMobile){
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Scrolling down: hide navbar
      this.isHidden = true;
    } else {
      // Scrolling up: show and fix navbar if past 100px
      this.isHidden = false;
      if (currentScroll > 100) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
  }

}
