import { InjectionToken } from '@angular/core';
import {UserService} from "./user.service";


export const USER_SERVICE_TOKEN = new InjectionToken<UserService>('USER_SERVICE_TOKEN');
