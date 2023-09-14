import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {TOKEN_KEY, TOKEN_KEY_REFRESH} from '../../constants';
import {IAuthService} from "../auth.service.interface";
import {Observable, of} from "rxjs";
import {IUserModel} from "../../models/user.model.interface";

interface AuthResponse {
  authenticated: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private apiUrl = '/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    console.log('email: ' + email + ' password: ' + password);
    return this.http.post<{
      refreshToken: string;
      token: string }>(`${this.apiUrl}/login`, {email, password})
      .pipe(tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(TOKEN_KEY_REFRESH, res.refreshToken);
      }));
  }

  logout() {


    const refreshToken = localStorage.getItem(TOKEN_KEY_REFRESH);

    return this.http.post<void>(`${this.apiUrl}/logout`, {refreshToken});
  }

  loggedIn() {
    return this.http.get(`${this.apiUrl}/is-user-authenticated`).pipe(
      map(() => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }


  refreshToken(): Observable<{ token: string }> {
    const refreshToken = localStorage.getItem(TOKEN_KEY_REFRESH);
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, {refreshToken}).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
      })
    );
  }

  getUser(): Observable<IUserModel> {
    return this.http.get<IUserModel>(`${this.apiUrl}/user-logged`);
  }


}
