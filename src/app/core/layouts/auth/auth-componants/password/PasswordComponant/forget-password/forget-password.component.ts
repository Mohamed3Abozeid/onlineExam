import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLibService } from 'auth-Lib';
import { CustomBtnComponent } from '../../../custom-componants/custom-btn/custom-btn.component';
import { CustomErrorComponent } from '../../../custom-componants/custom-error/custom-error.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomBtnComponent,
    CustomErrorComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  constructor(private _AuthLibService: AuthLibService) {
  }
  private readonly _Router = inject(Router);

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: string = '';
  @Output() userEmail = new EventEmitter<string>();
  sendEmail() {
    this.userEmail.emit(this.forgetForm.value.email);
  }
  forgetFun() {
    this.isLogin = true;
    this._AuthLibService.ForgetPassword(this.forgetForm.value).subscribe({
      next: (data) => {
        this.isLogin = false;
        // console.log(this.forgetForm.value.email);
        this.sendEmail();
      },

      error: (err) => {
        this.isLogin = false;
        this.errorMassage = 'There is no account with this email';
      },
    });
  }
}
