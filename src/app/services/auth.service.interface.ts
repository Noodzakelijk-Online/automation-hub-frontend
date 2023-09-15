import {Observable} from "rxjs";
import {IUserModel} from "../models/user.model.interface";

export interface IAuthService {
  login(username: string, password: string): Observable<Object>;
  logout(): Observable<void>;
  loggedIn(): Observable<boolean>;
}
