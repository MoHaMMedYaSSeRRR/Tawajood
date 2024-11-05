import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }

  contactUs(data:any):Observable<any> {
    return this._HttpClient.post('https://companywebsite.tawajood.com/api/add_form_contact_us', data);
  }
  getSlider():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/sliders');
  }
  whyUs():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/why_us');
  }
  getAbout():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/setting');
  }
}
