import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _HttpClient:HttpClient) { }
  getServices():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/services');
  }
}
