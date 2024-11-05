import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _HttpClient:HttpClient) { }
  getMobileProjects():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/projects_apps');
  }
  getWebProjects():Observable<any> {
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/projects_websites');
  }
}
