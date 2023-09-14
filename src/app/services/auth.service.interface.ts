import {Observable} from "rxjs";
import {IUserModel} from "../models/user.model.interface";

export interface IAuthService {
  login(username: string, password: string): Observable<{token: string}>;
  logout(): Observable<void>;
  loggedIn(): Observable<boolean>;
  refreshToken(): Observable<{token: string}>;
  getUser(): Observable<IUserModel>;
}
