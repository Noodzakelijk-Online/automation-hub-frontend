import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {IAuthService} from "../../auth.service.interface";
import {AUTH_SERVICE_TOKEN} from "../auth.service.token";
import {map} from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) => {
    const authService: IAuthService = inject(AUTH_SERVICE_TOKEN);
    const router = inject(Router);
    return authService.loggedIn().pipe(
        map(authenticated => {
            if (authenticated) {
                return true;
            } else {
                router.navigate(['/login']).then(() => {
                });
                return false;
            }
        })
    );
};
