import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoloutionsService {

  constructor(private _HttpClient:HttpClient) { }

  getSoloutions():Observable<any> {
    return this._HttpClient.get('https://newcompanywebsite.tawajood.com/api/solutions');
  }
}
