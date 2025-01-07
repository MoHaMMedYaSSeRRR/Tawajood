import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private _HttpClient: HttpClient) {}
  getServices(): Observable<any> {
    return this._HttpClient.get(
      'https://dev.tawajood.com/api/services'
    );
  }
  getServicesDetails(id: any): Observable<any> {
    return this._HttpClient.get(
      `https://dev.tawajood.com/api/single_service/${id}`
    );
  }
  askForSupport(data: any): Observable<any> {
    return this._HttpClient.post(
      'https://dev.tawajood.com/api/add_ask_for_supports',
      data
    );
  }
}
