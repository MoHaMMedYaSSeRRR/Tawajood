import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }

  contactUs(data:any):Observable<any> {
    return this._HttpClient.post('https://dev.tawajood.com/api/add_form_contact_us', data);
  }
  getSlider():Observable<any> {
    return this._HttpClient.get('https://dev.tawajood.com/api/sliders');
  }

  getAbout():Observable<any> {
    return this._HttpClient.get('https://dev.tawajood.com/api/setting');
  }
  getTeam():Observable<any> {
    return this._HttpClient.get('https://dev.tawajood.com/api/team');
  }
  whyus():Observable<any> {
    return this._HttpClient.get('https://dev.tawajood.com/api/why_us');
  }
  getpartners():Observable<any>{
    return this._HttpClient.get('https://dev.tawajood.com/api/clients');
  }
  getContactUs():Observable<any>{
    return this._HttpClient.get('https://dev.tawajood.com/api/contact_us');
  }
  getTechnology():Observable<any>{
    return this._HttpClient.get('https://dev.tawajood.com/api/technologies');
  }
  getProccess():Observable<any>{
    return this._HttpClient.get('https://dev.tawajood.com/api/our_process');
  }
  contact(data:any):Observable<any>{
    return this._HttpClient.post('https://dev.tawajood.com/api/add_form_contact_us', data);
  }
  checkIp():Observable<any>{
    return this._HttpClient.get('https://ipwhois.app/json/');
  }
  getCountryCodes():Observable<any>{
    return this._HttpClient.get('https://restcountries.com/v3.1/all');
  }
}
