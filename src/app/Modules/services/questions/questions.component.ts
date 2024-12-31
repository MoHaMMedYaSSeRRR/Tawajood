import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { changelangService } from 'src/app/Services/changelang.service';
import { ServicesService } from 'src/app/Services/services.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  currentLang: any;
  @Input() id!: number; 
  faqs :any;
  faqForm:FormGroup = new FormGroup({
    service_id:new FormControl(null , [Validators.required]),
    the_topic:new FormControl(null , [Validators.required]),
    email :new FormControl(null , [Validators.email , Validators.required]),
    message :new FormControl(null , [Validators.required]),
  })
  
  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _ServicesService: ServicesService,
    private _ToastrService:ToastrService
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;

      this.cdr.detectChanges();
    });
    console.log(this.id)
    this._ServicesService.getServicesDetails(this.id).subscribe({
      next: (data) => {
        this.faqs = data.data.faq.map((faq: any) => ({
          ...faq,
          answer: this.stripHtml(faq.answer) // Apply stripHtml to the answer
        }));        
        console.log(this.faqs);
      },
    });
    this.faqForm.controls['service_id'].setValue(this.id);

  }
  stripHtml(html: string): string {
    if (!html) {
      return '';
    }
    return html
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
      .trim(); // Remove extra whitespace
  }
  onLanguageChange() {
    this.cdr.detectChanges();
  }
  toggleAnswer(faq: any) {
    faq.open = !faq.open;
  }
  onSubmit() {
     this._ServicesService.askForSupport(this.faqForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
