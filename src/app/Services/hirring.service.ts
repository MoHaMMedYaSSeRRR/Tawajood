import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HirringService {

  constructor(private _HttpClient:HttpClient) { }

  getGobs(): Observable<any>{
    return  this._HttpClient.get(`https://newcompanywebsite.tawajood.com/api/jobs`)
  }
  getJobsById(id:any): Observable<any>{
    return this._HttpClient.post(`https://newcompanywebsite.tawajood.com/api/job_by_id`,{
      job_id:id
    })
  }
  askForSupport(data: any): Observable<any> {
    return this._HttpClient.post(
      'https://newcompanywebsite.tawajood.com/api/apply_now',
      data
    );
  }
}
