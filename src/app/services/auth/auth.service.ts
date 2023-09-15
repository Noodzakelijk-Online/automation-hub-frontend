import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {IAuthService} from "../auth.service.interface";
import {Observable, of} from "rxjs";
import {IUserModel} from "../../models/user.model.interface";


@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthService {
    private apiUrl = '/api/v1/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post(`${this.apiUrl}/login`, {email, password});
    }


    logout() {
        return this.http.get<void>(`${this.apiUrl}/logout`);
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
}
