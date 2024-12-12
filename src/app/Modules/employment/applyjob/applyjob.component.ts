import {
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  changelangService
} from 'src/app/Services/changelang.service';
import {
  HirringService
} from 'src/app/Services/hirring.service';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss'],
})
export class ApplyjobComponent {
  currentLang: any;
  id: any;
  job: any;
  fileName: string | null = null;
  isDropdownOpen = false;
  selectedCountry = { name: 'Egypt', code: '+20', flag: 'egypt.png' };

  countryCodes = [
    { name: 'Egypt', code: '+20', flag: 'egypt.png' },
    { name: 'United States', code: '+1', flag: 'us.png' },
    { name: 'United Kingdom', code: '+44', flag: 'uk.png' },
    { name: 'India', code: '+91', flag: 'india.png' },
    { name: 'Saudi Arabia', code: '+966', flag: 'saudi.png' },
    { name: 'Canada', code: '+1', flag: 'canada.png' },
    { name: 'Germany', code: '+49', flag: 'germany.png' },
    // Add more countries and flags as needed
  ];
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _HirringService: HirringService,
    private _ActivatedRoute: ActivatedRoute,
  ) {}
  
  applicationForm: FormGroup = new FormGroup({
    job_opportunitie_id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    expected_salary: new FormControl(null, Validators.required),
    years_of_experience: new FormControl(null, Validators.required),
    protfolio_link: new FormControl(null), // nullable, no Validators.required
    notice_period: new FormControl(null, Validators.required),
    linkedin_link: new FormControl(null), // nullable, no Validators.required
    tell_us: new FormControl(null), // nullable, no Validators.required
    cv: new FormControl(null, Validators.required),
    country_code: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      this.cdr.detectChanges();
    });

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    });

    this._HirringService.getJobsById(this.id).subscribe({
      next: (res) => {
        this.job = res.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[formControlName="cv"]') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fileName = input.files[0].name;
      this.applicationForm.patchValue({
        cv: input.files[0]
      });
    }
  }

  onSubmit() {
    console.log(this.applicationForm.value);
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.applicationForm.get('country_code')?.setValue(country.code);
    this.isDropdownOpen = false;
  }
}
