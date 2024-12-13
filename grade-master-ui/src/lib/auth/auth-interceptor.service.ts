import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let auth = false;
    this.auth
      .isAuthenticated$()
      .pipe(take(1))
      .subscribe((isAuthenticated) => {
        auth = isAuthenticated;
      });

    if (auth) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${this.auth.getToken()}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
