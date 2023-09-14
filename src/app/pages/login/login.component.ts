import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {TOKEN_KEY} from '../../constants';
import { AUTH_SERVICE_TOKEN } from "../../services/auth/auth.service.token";
import { IAuthService } from '../../services/auth.service.interface';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  validateForm: FormGroup = this.fb.group({});


  constructor(private fb: FormBuilder, private notification: NzNotificationService,
              @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', {updateOn: 'blur', validators: [Validators.required, Validators.email]}],
      password: ['', {updateOn: 'blur', validators: [Validators.required]}],
      remember: [true]
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.authService.login(this.validateForm.value.userName, this.validateForm.value.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/home']).catch(() => {
          });
        },
        error: (error) => {
          if (error.status === 401) {
            this.notification.create(
              'error',
              'Login Failed',
              'Incorrect username or password.'
            );
          } else {
            this.notification.create(
              'error',
              'Network Error',
              'An unexpected error occurred. Please try again later.'
            );
          }
        }
      });

  }
}
