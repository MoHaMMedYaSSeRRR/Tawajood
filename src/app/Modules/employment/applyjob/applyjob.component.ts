import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';
import { HirringService } from 'src/app/Services/hirring.service';
import { ToastrService } from 'ngx-toastr';

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
    { code: '966', flag: '🇸🇦', name_ar: 'السعودية', name_en: 'Saudi Arabia' },
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
    { code: '973', flag: '🇧🇭', name_ar: 'البحرين', name_en: 'Bahrain' },
    { code: '974', flag: '🇶🇦', name_ar: 'قطر', name_en: 'Qatar' },
    { code: '963', flag: '🇸🇾', name_ar: 'سوريا', name_en: 'Syria' },
    { code: '965', flag: '🇰🇼', name_ar: 'الكويت', name_en: 'Kuwait' },
    { code: '967', flag: '🇾🇪', name_ar: 'اليمن', name_en: 'Yemen' },
    { code: '962', flag: '🇯🇴', name_ar: 'الأردن', name_en: 'Jordan' },
    { code: '252', flag: '🇸🇴', name_ar: 'الصومال', name_en: 'Somalia' },
    { code: '222', flag: '🇲🇷', name_ar: 'موريتانيا', name_en: 'Mauritania' }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _HirringService: HirringService,
    private _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router
  ) {}

  applicationForm: FormGroup = new FormGroup({
    job_opportunitie_id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    expected_salary: new FormControl(null, Validators.required),
    years_of_experience: new FormControl(null, Validators.required),
    protfolio_link: new FormControl(null),
    notice_period: new FormControl(null,),
    linkedin_link: new FormControl(null),
    tell_us: new FormControl(null),
    cv: new FormControl(null, Validators.required),
    country_code: new FormControl('+20', Validators.required),
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
        // Set job_opportunitie_id here, after the ID is fetched
        this.applicationForm.controls['job_opportunitie_id'].setValue(this.id);
      },
    });
  
    this._HirringService.getJobsById(this.id).subscribe({
      next: (res) => {
        this.job = res.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  

  triggerFileInput() {
    const fileInput = document.querySelector(
      'input[formControlName="cv"]'
    ) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name;
  
      // Check if the file is of the correct type (e.g., PDF or DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        this.applicationForm.patchValue({
          cv: file
        });
      } else {
        console.error('Invalid file type. Please upload a PDF or Word document.');
      }
    }
  }
  

  onSubmit() {
    if (!this.applicationForm.controls['job_opportunitie_id'].value) {
      console.error('job_opportunitie_id is required');
      return;
    }
  
    // Add the country code to the form data
    this.applicationForm.controls['country_code'].setValue(this.selectedCountry.code);
  
    // Create a FormData object to send the form data along with the file
    const formData = new FormData();
  
    // Append form data, ensuring that the 'cv' is added correctly as a file
    Object.keys(this.applicationForm.value).forEach((key) => {
      const value = this.applicationForm.get(key)?.value;
      if (key === 'cv' && value instanceof File) {
        formData.append(key, value);  // Only append the file if it's a File object
      } else {
        formData.append(key, value);
      }
    });
  
    // Send the form data using the service method
    this._HirringService.askForSupport(formData).subscribe({
      next: (res) => {
          if(res.result==true) {
            this.toastr.success(res.message);
            this.router.navigate(['/hirring']);

          }
      },
      error: (err) => {
        console.error('Form submission failed:', err);
      },
    });
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
