import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { changelangService } from 'src/app/Services/changelang.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  currentLang: any;
  constructor(
    private changelangService: changelangService,
    private _translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.changelangService.currentLang$.subscribe((lang) => {
      this._translate.use(lang);
      this.currentLang = lang;
      
      this.cdr.detectChanges();
    });
  }
  onLanguageChange() {
    this.cdr.detectChanges();
    
  }
  faqs = [
    {
      question: 'ما هي خطوات تطوير المواقع من الألف إلى الياء؟',
      answer: `تحديد نوعية المحتوى الذي سيتم عرضه، سواء كان محتوى معلوماتي، سلع وبضائع للتسويق، أو دورات تدريبية، وغيرها.
               اختيار اسم للموقع يجب أن يكون الاسم معبراً عن نشاط الموقع ليسهل على الزائرين التعرف على محتواه من خلال محركات البحث.
               تطوير التصميم: يشمل التصميم، الألوان، وتجربة المستخدم، وتكامل كافة العناصر لتحقيق أهداف الموقع.`,
      open: false
    },
    {
      question: 'ما هي خطوات تطوير المواقع من الألف إلى الياء؟',
      answer: `تحديد نوعية المحتوى الذي سيتم عرضه، سواء كان محتوى معلوماتي، سلع وبضائع للتسويق، أو دورات تدريبية، وغيرها.
               اختيار اسم للموقع يجب أن يكون الاسم معبراً عن نشاط الموقع ليسهل على الزائرين التعرف على محتواه من خلال محركات البحث.
               تطوير التصميم: يشمل التصميم، الألوان، وتجربة المستخدم، وتكامل كافة العناصر لتحقيق أهداف الموقع.`,
      open: false
    },
    {
      question: 'ما هي خطوات تطوير المواقع من الألف إلى الياء؟',
      answer: `تحديد نوعية المحتوى الذي سيتم عرضه، سواء كان محتوى معلوماتي، سلع وبضائع للتسويق، أو دورات تدريبية، وغيرها.
               اختيار اسم للموقع يجب أن يكون الاسم معبراً عن نشاط الموقع ليسهل على الزائرين التعرف على محتواه من خلال محركات البحث.
               تطوير التصميم: يشمل التصميم، الألوان، وتجربة المستخدم، وتكامل كافة العناصر لتحقيق أهداف الموقع.`,
      open: false
    },
    // Add more FAQs here
  ];
  toggleAnswer(faq: any) {
    faq.open = !faq.open;
  }
}
