import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserModel} from "../../models/user.model.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/v1/user';

  constructor(private http: HttpClient) { }

  getUser(): Observable<IUserModel> {
    return this.http.get<IUserModel>(`${this.apiUrl}/`);
  }

    updateUser(user: IUserModel): Observable<IUserModel> {
        return this.http.patch<IUserModel>(`${this.apiUrl}/`, user);
    }
}
