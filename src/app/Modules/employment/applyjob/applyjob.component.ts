import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';
import { HirringService } from 'src/app/Services/hirring.service';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss'],
})
export class ApplyjobComponent {
  currentLang: any;
id:any;
job:any;
  constructor(
    private cdr: ChangeDetectorRef,
    private changelangService: changelangService,
    private _translate: TranslateService,
    private _HirringService:HirringService ,
   private _ActivatedRoute:ActivatedRoute,
  ) {}
  applicationForm:FormGroup = new FormGroup({
    job_opportunitie_id: new FormControl(),
    name: new FormControl(),
    phone:new FormControl(),
    email: new FormControl(),
    expected_salary: new FormControl(),
    years_of_experience: new FormControl(),
    protfolio_link:new FormControl() ,// nullable
    notice_period: new FormControl(),
    linkedin_link: new FormControl(), // nullable
    tell_us: new FormControl(), // nullable
    cv: new FormControl(),
    country_code:new FormControl(),
  })
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
    })
  
  
    this._HirringService.getJobsById(this.id).subscribe({
      next: (res) => {
        this.job = res.data;    
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  onSubmit(){
  }
}
