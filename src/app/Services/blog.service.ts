import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _HttpClient: HttpClient
  ) { }
 getBlogTopic():Observable<any>{
  return this._HttpClient.get('https://companywebsite.tawajood.com/api/get_topics_blog');
  }
  getAllBlog():Observable<any>{
    return this._HttpClient.get('https://companywebsite.tawajood.com/api/our_blog');
  }
}
