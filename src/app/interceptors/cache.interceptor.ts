import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (request.url.includes('images')) {
      const cachedResponse = this.cache.get(request.url);
      if (cachedResponse) {
        return of(cachedResponse.clone());
      } else {
        return next.handle(request).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              this.cache.set(request.url, event.clone());
            }
          })
        );
      }
    }

    return next.handle(request);
  }
}
