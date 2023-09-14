import {Inject, Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {IAuthService} from "../services/auth.service.interface";
import {AUTH_SERVICE_TOKEN} from "../services/auth/auth.service.token";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {TOKEN_KEY, TOKEN_KEY_REFRESH} from "../constants";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Requisição interceptada:', req);
    const token = localStorage.getItem(TOKEN_KEY);
    let request = req;
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      request = req.clone({ headers });
      console.log('Requisição modificada:', request);
    } else {
      console.log('Token não encontrado');
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return new Observable<never>(observer => {
            observer.error(error);
          });
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${res.token}`);
        const newRequest = request.clone({ headers });
        return next.handle(newRequest);
      }),
      catchError(err => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY_REFRESH);
        this.router.navigate(['/login']);
        return new Observable<never>(observer => {
          observer.error(err);
        });
      })
    );
  }
}
