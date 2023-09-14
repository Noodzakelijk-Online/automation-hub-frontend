import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {AUTH_SERVICE_TOKEN} from "../../services/auth/auth.service.token";
import {AuthService} from "../../services/auth/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzLayoutModule} from "ng-zorro-antd/layout";

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzNotificationModule,
    NzCheckboxModule,
    NzCardModule,
    NzLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [LoginComponent],
  providers: [
    {provide: AUTH_SERVICE_TOKEN, useClass: AuthService}
  ]
})
export class LoginModule {
}
