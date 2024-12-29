import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoloutionsService {

  constructor(private _HttpClient:HttpClient) { }

  getSoloutions():Observable<any> {
    return this._HttpClient.get('https://dev.tawajood.com/api/solutions');
  }
  getSoloutionsByid(id:any):Observable<any> {
    return this._HttpClient.post('https://dev.tawajood.com/api/solution_by_id', {
      solution_id: id
    });
  }
}
