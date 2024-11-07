import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/interfaces/service';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  currentLang: any;
  selectedCountryCode = '+20'; // Default to Egypt
  showDropdown = false;
  allServices:Service[]= [];
  selectedService: Service | null = null;
  showCodeDropdown = true;
  phoneNumber = '';


  countries = [
    { code: '1', flag: '🇺🇸', name: 'United States' },
    { code: '1', flag: '🇨🇦', name: 'Canada' },
    { code: '20', flag: '🇪🇬', name: 'Egypt' },
    { code: '27', flag: '🇿🇦', name: 'South Africa' },
    { code: '30', flag: '🇬🇷', name: 'Greece' },
    { code: '31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '32', flag: '🇧🇪', name: 'Belgium' },
    { code: '33', flag: '🇫🇷', name: 'France' },
    { code: '34', flag: '🇪🇸', name: 'Spain' },
    { code: '39', flag: '🇮🇹', name: 'Italy' },
    { code: '44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '49', flag: '🇩🇪', name: 'Germany' },
    { code: '52', flag: '🇲🇽', name: 'Mexico' },
    { code: '55', flag: '🇧🇷', name: 'Brazil' },
    { code: '61', flag: '🇦🇺', name: 'Australia' },
    { code: '62', flag: '🇮🇩', name: 'Indonesia' },
    { code: '63', flag: '🇵🇭', name: 'Philippines' },
    { code: '64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '65', flag: '🇸🇬', name: 'Singapore' },
    { code: '66', flag: '🇹🇭', name: 'Thailand' },
    { code: '81', flag: '🇯🇵', name: 'Japan' },
    { code: '82', flag: '🇰🇷', name: 'South Korea' },
    { code: '84', flag: '🇻🇳', name: 'Vietnam' },
    { code: '86', flag: '🇨🇳', name: 'China' },
    { code: '90', flag: '🇹🇷', name: 'Turkey' },
    { code: '91', flag: '🇮🇳', name: 'India' },
    { code: '92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: '94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '95', flag: '🇲🇲', name: 'Myanmar' },
    { code: '98', flag: '🇮🇷', name: 'Iran' },
    { code: '212', flag: '🇲🇦', name: 'Morocco' },
    { code: '213', flag: '🇩🇿', name: 'Algeria' },
    { code: '216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '218', flag: '🇱🇾', name: 'Libya' },
    { code: '220', flag: '🇬🇲', name: 'Gambia' },
    { code: '221', flag: '🇸🇳', name: 'Senegal' },
    { code: '222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '223', flag: '🇲🇱', name: 'Mali' },
    { code: '224', flag: '🇬🇳', name: 'Guinea' },
    { code: '225', flag: '🇨🇮', name: 'Ivory Coast' },
    { code: '226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '227', flag: '🇳🇪', name: 'Niger' },
    { code: '228', flag: '🇹🇬', name: 'Togo' },
    { code: '229', flag: '🇧🇯', name: 'Benin' },
    { code: '230', flag: '🇲🇺', name: 'Mauritius' },
    { code: '231', flag: '🇱🇷', name: 'Liberia' },
    { code: '232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: '233', flag: '🇬🇭', name: 'Ghana' },
    { code: '234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '235', flag: '🇹🇩', name: 'Chad' },
    { code: '236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: '237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '238', flag: '🇨🇻', name: 'Cape Verde' },
    { code: '239', flag: '🇸🇹', name: 'São Tomé and Príncipe' },
    { code: '240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: '241', flag: '🇬🇦', name: 'Gabon' },
    { code: '242', flag: '🇨🇬', name: 'Congo' },
    { code: '243', flag: '🇨🇩', name: 'DR Congo' },
    { code: '244', flag: '🇦🇴', name: 'Angola' },
    { code: '245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: '248', flag: '🇸🇨', name: 'Seychelles' },
    { code: '249', flag: '🇸🇩', name: 'Sudan' },
    { code: '250', flag: '🇷🇼', name: 'Rwanda' },
    { code: '251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '252', flag: '🇸🇴', name: 'Somalia' },
    { code: '253', flag: '🇩🇯', name: 'Djibouti' },
    { code: '254', flag: '🇰🇪', name: 'Kenya' },
    { code: '255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '256', flag: '🇺🇬', name: 'Uganda' },
    { code: '257', flag: '🇧🇮', name: 'Burundi' },
    { code: '258', flag: '🇲🇿', name: 'Mozambique' },
    { code: '260', flag: '🇿🇲', name: 'Zambia' },
    { code: '261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '263', flag: '🇿🇼', name: 'Zimbabwe' },
    { code: '264', flag: '🇳🇦', name: 'Namibia' },
    { code: '265', flag: '🇲🇼', name: 'Malawi' },
    { code: '266', flag: '🇱🇸', name: 'Lesotho' },
    { code: '267', flag: '🇧🇼', name: 'Botswana' },
    { code: '268', flag: '🇸🇿', name: 'Eswatini' },
    { code: '269', flag: '🇰🇲', name: 'Comoros' },
    { code: '350', flag: '🇬🇮', name: 'Gibraltar' },
    { code: '351', flag: '🇵🇹', name: 'Portugal' },
    { code: '352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: '353', flag: '🇮🇪', name: 'Ireland' },
    { code: '354', flag: '🇮🇸', name: 'Iceland' },
    { code: '355', flag: '🇦🇱', name: 'Albania' },
    { code: '356', flag: '🇲🇹', name: 'Malta' },
    { code: '357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '358', flag: '🇫🇮', name: 'Finland' },
    { code: '359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '370', flag: '🇱🇹', name: 'Lithuania' },
    { code: '371', flag: '🇱🇻', name: 'Latvia' },
    { code: '372', flag: '🇪🇪', name: 'Estonia' },
    { code: '373', flag: '🇲🇩', name: 'Moldova' },
    { code: '374', flag: '🇦🇲', name: 'Armenia' },
    { code: '375', flag: '🇧🇾', name: 'Belarus' },
    { code: '376', flag: '🇦🇩', name: 'Andorra' },
    { code: '377', flag: '🇲🇨', name: 'Monaco' },
    { code: '378', flag: '🇸🇲', name: 'San Marino' }]

  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _ServicesService:ServicesService,
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });
    this._ServicesService.getServices().subscribe({
      next:(res)=>{
        this.allServices = res.data.services;
        console.log(this.allServices)
      }
    })
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    message: new FormControl('')
  });
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Process form data here
    }
  }
  

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
  
}

selectService(service: Service) {
  this.selectedService = service;
  this.contactForm.controls['service'].setValue(service.name);
  this.showDropdown = false;
}
selectCountry(country: any) {
  this.selectedCountryCode = `+${country.code}`;
  this.showCodeDropdown = false;
  this.phoneNumber = ''; 
}

toggleCodeDropdown() {
  console.log(this.showCodeDropdown)
  this.showCodeDropdown = !this.showCodeDropdown;
}

onPhoneChange(event: any) {
  const phoneValue = event.target.value;
  this.contactForm.controls['phone'].setValue(phoneValue.replace(this.selectedCountryCode, '').trim());
}

}
