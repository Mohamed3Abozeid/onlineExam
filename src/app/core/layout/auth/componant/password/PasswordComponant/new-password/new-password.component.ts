import { CustomBtnComponent } from './../../../custom/custom-btn/custom-btn.component';
import { Component, inject, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IconsBarComponent } from '../../../custom/icons-bar/icons-bar.component';
import { CustomErrorComponent } from '../../../custom/custom-error/custom-error.component';
import { AuthLibService } from 'auth-Lib';

@Component({
  selector: 'app-new-password',
  imports: [
    ReactiveFormsModule,
    IconsBarComponent,
    CustomBtnComponent,
    CustomErrorComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  constructor() {}
  private readonly _Router = inject(Router);
  private readonly _AuthLibService = inject(AuthLibService);
  isLogin: boolean = false;
  passwordType: boolean = false;
  @Input() userEmail!: string;
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
  });

  newPasswordFunc() {
    this.isLogin = true;
    this._AuthLibService
      .resetPassword({
        'email': this.userEmail,
        'newPassword': this.passwordForm.value.password,
      })
      .subscribe({
        next: (data) => {
          this.isLogin = false;

          this._Router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLogin = false;
        },
      });
  }

  passwordTogle() {
    if (this.passwordType) {
      this.passwordType = false;
    } else {
      this.passwordType = true;
    }
  }
}
