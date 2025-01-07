import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.currentLang$.pipe(
      switchMap(currentLang => {
        const modifiedReq = req.clone({
          setHeaders: {
            'lang': currentLang || 'en' // Set the default language if none is available
          }
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
