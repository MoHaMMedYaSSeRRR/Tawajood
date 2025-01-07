import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Meta, SafeHtml, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { HomeService } from 'src/app/Services/home.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  currentLang: any;
  selectedCountryCode = '+20'; // Default to Egypt
  showDropdown = false;
  allServices: Service[] = [];
  selectedService: Service | null = null;
  showCodeDropdown = true;
  phoneNumber = '';
  isInComponent: boolean = false;
  sanitizedContent: SafeHtml | null = null;
  serviceId: any;
  isDropdown: boolean = false;

  countries = [
    { code: '20', flag: '🇪🇬', name_ar: 'مصر', name_en: 'Egypt' },
    { code: '212', flag: '🇲🇦', name_ar: 'المغرب', name_en: 'Morocco' },
    { code: '213', flag: '🇩🇿', name_ar: 'الجزائر', name_en: 'Algeria' },
    { code: '216', flag: '🇹🇳', name_ar: 'تونس', name_en: 'Tunisia' },
    { code: '218', flag: '🇱🇾', name_ar: 'ليبيا', name_en: 'Libya' },
    { code: '249', flag: '🇸🇩', name_ar: 'السودان', name_en: 'Sudan' },
    { code: '964', flag: '🇮🇶', name_ar: 'العراق', name_en: 'Iraq' },
    { code: '968', flag: '🇴🇲', name_ar: 'عمان', name_en: 'Oman' },
    { code: '970', flag: '🇵🇸', name_ar: 'فلسطين', name_en: 'Palestine' },
    { code: '971', flag: '🇦🇪', name_ar: 'الإمارات', name_en: 'United Arab Emirates' },
    { code: '972', flag: '🇮🇱', name_ar: 'إسرائيل', name_en: 'Israel' },
    { code: '973', flag: '🇧🇭', name_ar: 'البحرين', name_en: 'Bahrain' },
    { code: '974', flag: '🇶🇦', name_ar: 'قطر', name_en: 'Qatar' },
    { code: '963', flag: '🇸🇾', name_ar: 'سوريا', name_en: 'Syria' },
    { code: '965', flag: '🇰🇼', name_ar: 'الكويت', name_en: 'Kuwait' },
    { code: '966', flag: '🇸🇦', name_ar: 'السعودية', name_en: 'Saudi Arabia' },
    { code: '967', flag: '🇾🇪', name_ar: 'اليمن', name_en: 'Yemen' },
    { code: '962', flag: '🇯🇴', name_ar: 'الأردن', name_en: 'Jordan' },
    { code: '252', flag: '🇸🇴', name_ar: 'الصومال', name_en: 'Somalia' },
    { code: '222', flag: '🇲🇷', name_ar: 'موريتانيا', name_en: 'Mauritania' }
  ];
  contactUs: any;

  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _ServicesService: ServicesService,
    private router: Router,
    private _HomeService:HomeService,
    private _ToastrService:ToastrService,
    private meta: Meta, private title: Title

  ) {}
  toggleDropdowncountry() {
    this.isDropdown = !this.isDropdown;
  }
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    this._ServicesService.getServices().subscribe({
      next: (res) => {
        this.allServices = res.data.services;
        // console.log(this.allServices);
      },
    });
    this._HomeService.getContactUs().subscribe({
      next: (res) => {
        this.contactUs = res.data.contact_us;
        console.log(this.contactUs)
      },
    })
    this.checkRoute();
    this.setMetaTags();
  }
  setMetaTags(): void {
    this._translate.get('hirringmeta').subscribe((meta) => {
      // Set the meta title
      this.title.setTitle(meta.title);

      // Set the meta description
      this.meta.updateTag({ name: 'description', content: meta.description });

      // Set the meta keywords
      this.meta.updateTag({ name: 'keywords', content: meta.keywords });
    });}
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/contact';
    });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  contactForm: FormGroup = new FormGroup({
    service_id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    country_code: new FormControl('+20', Validators.required),
    message: new FormControl(''),
  });
  onSubmit() {
    if (this.contactForm.valid) {
      // console.log(this.contactForm.value);
    }
    this._HomeService.contact(this.contactForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.result== true){
            this._ToastrService.success(res.message);
            this.contactForm.reset();
          }
        }
    })
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  selectedCountry = { name: 'Egypt', code: '+20', flag: 'egypt.png' };

  selectService(service: Service) {
    this.selectedService = service;
    this.contactForm.controls['service_id'].setValue(service.id);
    console.log(this.contactForm.value)
    this.showDropdown = false;
  }
  selectCountry(country: any) {
    this.selectedCountryCode = `+${country.code}`;
    this.selectedCountry = country;
    this.isDropdown = false;
    this.phoneNumber = '';
  }

  toggleCodeDropdown() {
    console.log(this.showCodeDropdown);
    this.showCodeDropdown = !this.showCodeDropdown;
  }

  onPhoneChange(event: any) {
    const phoneValue = event.target.value;
    this.contactForm.controls['phone'].setValue(
      phoneValue.replace(this.selectedCountryCode, '').trim()
    );
  }
}
